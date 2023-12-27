package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Repository.TripRepository;
import backend.yagodnoye.Services.validators.GenericValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final GenericValidator validator;


    public List<Trip> findAll(){
        return tripRepository.findAll();
    }

    public Trip addTrip(String name, String description, LocalDate startDate, LocalDate endDate, BerryPerson mainOrganizer) throws WrongParametersException {
        validator.validateDate(startDate, endDate);
        if (name.trim().isEmpty()) throw new WrongParametersException("Name");
        if (description.trim().isEmpty()) throw new WrongParametersException("Description");
        if (mainOrganizer == null) throw new WrongParametersException("Main organizer");
        Trip trip = new Trip(name, description, startDate, endDate, mainOrganizer);
        tripRepository.save(trip);
        return trip;
    }

    public void deleteTrip(Long id) throws WrongParametersException {
        validator.validateId(id);
        tripRepository.deleteByIdEquals(id);
    }

    public Trip findTripById(Long id) throws TripNotFoundException, WrongParametersException {
        validator.validateId(id);
        Optional<Trip> tripOptional = tripRepository.findByIdEquals(id);
        if (tripOptional.isEmpty()) throw new TripNotFoundException("Trip with id " + id + " was not found!");
        return tripOptional.get();
    }

    public boolean tripExists(Long tripID) throws WrongParametersException {
        validator.validateId(tripID);
        return tripRepository.findByIdEquals(tripID).isPresent();
    }
}
