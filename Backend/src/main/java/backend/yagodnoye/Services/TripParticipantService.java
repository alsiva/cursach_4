package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Entities.TripParticipant;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Repository.TripParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TripParticipantService {
    private final TripParticipantRepository repository;


    public TripParticipant addTripParticipant(BerryPerson berryPerson, Trip trip, String letter) throws AlreadyExistsException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(),trip.getId());
        if (tripParticipantOptional.isPresent()) throw new AlreadyExistsException("Trip participant of tripId = " + trip.getId() + " and personId = " + berryPerson.getId() + " already exists");
        TripParticipant tripParticipant = new TripParticipant(berryPerson, trip, letter, false);
        repository.save(tripParticipant);
        return tripParticipant;
    }

    public void approveTripParticipant(BerryPerson berryPerson, Trip trip) throws PersonNotFoundException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
        if (tripParticipantOptional.isEmpty()) throw new PersonNotFoundException("Person with id = " + berryPerson.getId() + " was not found!");
        tripParticipantOptional.get().setApproved(true);
        repository.updateApprovedByBerryPersonEqualsAndTripEquals(true,berryPerson,trip);
    }
    public void refuseTripParticipant(BerryPerson berryPerson, Trip trip) throws PersonNotFoundException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
        if (tripParticipantOptional.isEmpty()) throw new PersonNotFoundException("Person with id = " + berryPerson.getId() + " was not found!");
        tripParticipantOptional.get().setApproved(false);
        repository.updateApprovedByBerryPersonEqualsAndTripEquals(false,berryPerson,trip);
    }

    public TripParticipant getTripParticipant(BerryPerson berryPerson, Trip trip) throws PersonNotFoundException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
        if (tripParticipantOptional.isEmpty()) throw new PersonNotFoundException("Person with id = " + berryPerson.getId() + " was not found!");
        return tripParticipantOptional.get();
    }

    public List<TripParticipant> getAllTripParticipants(Trip trip){
        return repository.findByTrip_IdEquals(trip.getId());
    }


}
