package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Entities.TripParticipant;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Repository.TripParticipantRepository;
import backend.yagodnoye.Repository.TripRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class TripParticipantService {
    private final TripParticipantRepository repository;

    public TripParticipantService(TripParticipantRepository repository){
        this.repository = repository;
    }

    public TripParticipant addTripParticipant(BerryPerson berryPerson, Trip trip, String letter) throws AlreadyExistsException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(),trip.getId());
        if (tripParticipantOptional.isPresent()) throw new AlreadyExistsException();
        TripParticipant tripParticipant = new TripParticipant(berryPerson, trip, letter, false);
        repository.save(tripParticipant);
        return tripParticipant;
    }

    public void approveTripParticipant(BerryPerson berryPerson, Trip trip) throws PersonNotFoundException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
        if (tripParticipantOptional.isEmpty()) throw new PersonNotFoundException();
        tripParticipantOptional.get().setApproved(true);
        repository.updateApprovedByBerryPersonEqualsAndTripEquals(true,berryPerson,trip);
    }
    public void refuseTripParticipant(BerryPerson berryPerson, Trip trip) throws PersonNotFoundException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
        if (tripParticipantOptional.isEmpty()) throw new PersonNotFoundException();
        tripParticipantOptional.get().setApproved(false);
        repository.updateApprovedByBerryPersonEqualsAndTripEquals(false,berryPerson,trip);
    }

    public TripParticipant getTripParticipant(BerryPerson berryPerson, Trip trip) throws PersonNotFoundException {
        Optional<TripParticipant> tripParticipantOptional = repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
        if (tripParticipantOptional.isEmpty()) throw new PersonNotFoundException();
        return tripParticipantOptional.get();
    }

    public List<TripParticipant> getAllTripParticipants(Trip trip){
        return repository.findByTrip_IdEquals(trip.getId());
    }


}
