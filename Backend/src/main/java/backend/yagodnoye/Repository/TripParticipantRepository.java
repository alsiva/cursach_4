package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Entities.TripParticipant;
import backend.yagodnoye.IdClasses.TripParticipantID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TripParticipantRepository extends JpaRepository<TripParticipant, TripParticipantID> {
    @Transactional
    @Modifying
    @Query("update TripParticipant t set t.approved = ?1 where t.berryPerson = ?2 and t.trip = ?3")
    void updateApprovedByBerryPersonEqualsAndTripEquals(@NonNull boolean approved, @NonNull BerryPerson berryPerson, @NonNull Trip trip);
    @Query("select t from TripParticipant t where t.trip.id = ?1")
    List<TripParticipant> findByTrip_IdEquals(@NonNull Long id);
    @Query("select t from TripParticipant t where t.berryPerson.id = ?1 and t.trip.id = ?2")
    Optional<TripParticipant> findByBerryPerson_IdEqualsAndTrip_IdEquals(@NonNull Long id, @NonNull Object unknownAttr1);

}
