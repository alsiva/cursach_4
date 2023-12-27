package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;


    public List<Trip> findAll(){
        return tripRepository.findAll();
    }

    public Trip addTrip(String name, String description, LocalDate startDate, LocalDate endDate, BerryPerson mainOrganizer) throws WrongParametersException {
        if (startDate.isBefore(LocalDate.now())) throw new WrongParametersException("Start date");
        else if (startDate.isAfter(endDate)) throw new WrongParametersException("Start date > end date");
        if (name.trim().isEmpty()) throw new WrongParametersException("Name");
        if (description.trim().isEmpty()) throw new WrongParametersException("Description");
        if (mainOrganizer == null) throw new WrongParametersException("Main organizer");
        Trip trip = new Trip(name, description, startDate, endDate, mainOrganizer);
        tripRepository.save(trip);
        return trip;
    }

    public void deleteTrip(Long id){
        tripRepository.deleteByIdEquals(id);
    }

    public Trip findTripById(Long id) throws TripNotFoundException {
        Optional<Trip> tripOptional = tripRepository.findByIdEquals(id);
        if (tripOptional.isEmpty()) throw new TripNotFoundException("Trip with id " + id + " was not found!");
        return tripOptional.get();
    }

    public boolean tripExists(Long tripID) {
        return tripRepository.findByIdEquals(tripID).isPresent();
    }
}
