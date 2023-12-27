package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Exceptions.*;
import backend.yagodnoye.Repository.SettlementRepository;
import backend.yagodnoye.Services.validators.GenericValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.NotAcceptableStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SettlementService {
    private final SettlementRepository repository;
    private final TripService tripService;
    private final BerryPersonService berryPersonService;
    private final HouseService houseService;
    private final TripParticipantService tripParticipantService;
    private final GenericValidator validator;

    public List<Settlement> getSettlement(Long tripID) throws WrongParametersException, TripNotFoundException {
        validator.validateId(tripID);
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException("Trip with id "+ tripID + " was not found");
        return repository.findByTrip_IdEquals(tripID);
    }

    public Settlement settleBerryPerson(Long tripID, Long personID, Long houseID) throws HouseNotFoundException, PersonNotFoundException, HouseIsFullException, TripNotFoundException, WrongParametersException {
        validator.validateId(tripID);
        validator.validateId(personID);
        validator.validateId(houseID);
        Trip trip = tripService.findTripById(tripID);
        House house= houseService.getHouseByID(houseID);
        BerryPerson person = berryPersonService.findById(personID);
        if (!tripParticipantService.getTripParticipant(person,trip).isApproved()) throw new NotAcceptableStatusException("Not invited person!");
        List<Settlement> settlementList = repository.findByTrip_IdAndHouse_Id(tripID, houseID);
        Settlement settlement = new Settlement(trip, person, house);
        if(settlementList.isEmpty()) {
            repository.save(settlement);
            return settlement;
        }
        else if (settlementList.get(0).getHouse().getMaxPeople() <= settlementList.size()) throw new HouseIsFullException("House with id = " + houseID + " is already full!");
        repository.save(new Settlement(trip, person, house));
        return settlement;
    }

    public void unSettlePerson(Long tripID, Long personID, Long houseID) throws TripNotFoundException, HouseNotFoundException, PersonNotFoundException, WrongParametersException {
        validator.validateId(tripID);
        validator.validateId(personID);
        validator.validateId(houseID);
        Trip trip = tripService.findTripById(tripID);
        House house= houseService.getHouseByID(houseID);
        BerryPerson person = berryPersonService.findById(personID);
        Optional<Settlement> settlementOptional = repository.findByTripEqualsAndHouseEqualsAndBerryPersonEquals(trip, house, person);
        if (settlementOptional.isEmpty()) throw new PersonNotFoundException("Person with id =" + personID + " was not found");
        repository.delete(settlementOptional.get());
    }
}
