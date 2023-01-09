package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Exceptions.HouseIsFullException;
import backend.yagodnoye.Exceptions.HouseNotFoundException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Repository.SettlementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SettlementService {
    private SettlementRepository repository;
    private TripService tripService;
    private BerryPersonService berryPersonService;
    private HouseService houseService;

    public SettlementService(SettlementRepository repository, TripService tripService, BerryPersonService berryPersonService, HouseService houseService){
        this.repository = repository;
        this.tripService = tripService;
        this.berryPersonService = berryPersonService;
        this.houseService = houseService;
    }

    public List<Settlement> getSettlement(Long tripID){
        return repository.findByTrip_IdEquals(tripID);
    }

    public void settleBerryPerson(Long tripID, Long personID, Long houseID) throws HouseNotFoundException, PersonNotFoundException, HouseIsFullException, TripNotFoundException {
        Trip trip = tripService.findTripById(tripID);
        House house= houseService.getHouseByID(houseID);
        List<Settlement> settlementList = repository.findByTrip_IdAndHouse_Id(tripID, houseID);
        if (settlementList.get(0).getHouse().getMaxPeople() <= settlementList.size()) throw new HouseIsFullException();
        repository.save(new Settlement(trip, berryPersonService.findById(personID), house));
    }
}
