package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TripService {

    private TripRepository tripRepository;

    public TripService(TripRepository tripRepository){
        this.tripRepository = tripRepository;
    }

    public List<Trip> findAll(){
        return tripRepository.findAll();
    }

    public Trip addTrip(String name, String description, LocalDate startDate, LocalDate endDate, BerryPerson mainOrganizer){
        Trip trip = new Trip(name, description, startDate, endDate, mainOrganizer);
        tripRepository.save(trip);
        return trip;
    }

    public int deleteTrip(Long id){
        return tripRepository.deleteByIdEquals(id);
    }

    public Trip findTripById(Long id) {return tripRepository.findByIdEquals
    (id);}

}
