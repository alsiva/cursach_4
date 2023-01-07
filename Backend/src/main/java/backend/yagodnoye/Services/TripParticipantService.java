package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Entities.TripParticipant;
import backend.yagodnoye.Repository.TripParticipantRepository;
import backend.yagodnoye.Repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripParticipantService {
    private final TripParticipantRepository repository;

    public TripParticipantService(TripParticipantRepository repository){
        this.repository = repository;
    }

    public TripParticipant addTripParticipant(BerryPerson berryPerson, Trip trip, String letter){
        TripParticipant tripParticipant = new TripParticipant(berryPerson, trip, letter, false);
        repository.save(tripParticipant);
        return tripParticipant;
    }

    public void approveTripParticipant(BerryPerson berryPerson, Trip trip){
        repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId()).setApproved(true);
        repository.updateApprovedByBerryPersonEqualsAndTripEquals(true,berryPerson,trip);
    }
    public void refuseTripParticipant(BerryPerson berryPerson, Trip trip){
        repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId()).setApproved(false);
        repository.updateApprovedByBerryPersonEqualsAndTripEquals(false,berryPerson,trip);
    }

    public TripParticipant getTripParticipant(BerryPerson berryPerson, Trip trip){
        return repository.findByBerryPerson_IdEqualsAndTrip_IdEquals(berryPerson.getId(), trip.getId());
    }

    public List<TripParticipant> getAllTripParticipants(Trip trip){
        return repository.findByTrip_IdEquals(trip.getId());
    }


}
