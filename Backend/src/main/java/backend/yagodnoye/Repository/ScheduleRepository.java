package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.Schedule;
import backend.yagodnoye.IdClasses.ScheduleID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, ScheduleID> {
    List<Schedule> findByTrip_IdEquals(@NonNull Long id);
    @Query("select s from Schedule s where s.trip.id = ?1 and s.start = ?2 and s.end = ?3")
    Optional<Schedule> findByTrip_IdEqualsAndStartEqualsAndEndEquals(@NonNull Long id, @NonNull LocalDateTime start, @NonNull LocalDateTime end);
}
