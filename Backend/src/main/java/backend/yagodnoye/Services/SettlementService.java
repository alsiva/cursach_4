package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Exceptions.HouseIsFullException;
import backend.yagodnoye.Exceptions.HouseNotFoundException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Repository.SettlementRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.NotAcceptableStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SettlementService {
    private SettlementRepository repository;
    private TripService tripService;
    private BerryPersonService berryPersonService;
    private HouseService houseService;
    private TripParticipantService tripParticipantService;

    public SettlementService(SettlementRepository repository, TripService tripService, BerryPersonService berryPersonService, HouseService houseService, TripParticipantService tripParticipantService){
        this.repository = repository;
        this.tripService = tripService;
        this.berryPersonService = berryPersonService;
        this.houseService = houseService;
        this.tripParticipantService = tripParticipantService;
    }

    public List<Settlement> getSettlement(Long tripID){
        return repository.findByTrip_IdEquals(tripID);
    }

    public void settleBerryPerson(Long tripID, Long personID, Long houseID) throws HouseNotFoundException, PersonNotFoundException, HouseIsFullException, TripNotFoundException {
        Trip trip = tripService.findTripById(tripID);
        House house= houseService.getHouseByID(houseID);
        BerryPerson person = berryPersonService.findById(personID);
        if (!tripParticipantService.getTripParticipant(person,trip).isApproved()) throw new NotAcceptableStatusException("Not invited person!");
        List<Settlement> settlementList = repository.findByTrip_IdAndHouse_Id(tripID, houseID);
        if(settlementList.isEmpty()) {
            repository.save(new Settlement(trip, person, house));
            return;
        }
        else if (settlementList.get(0).getHouse().getMaxPeople() <= settlementList.size()) throw new HouseIsFullException();
        repository.save(new Settlement(trip, person, house));
    }

    public void unSettlePerson(Long tripID, Long personID, Long houseID) throws TripNotFoundException, HouseNotFoundException, PersonNotFoundException {
        Trip trip = tripService.findTripById(tripID);
        House house= houseService.getHouseByID(houseID);
        BerryPerson person = berryPersonService.findById(personID);
        Optional<Settlement> settlementOptional = repository.findByTripEqualsAndHouseEqualsAndBerryPersonEquals(trip, house, person);
        if (settlementOptional.isEmpty()) throw new PersonNotFoundException();
        repository.delete(settlementOptional.get());
    }
}
