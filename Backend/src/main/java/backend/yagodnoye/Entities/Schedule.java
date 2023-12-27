package backend.yagodnoye.Entities;

import backend.yagodnoye.IdClasses.ScheduleID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "tripschedule")
@IdClass(ScheduleID.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    @Id
    @ManyToOne(optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Id
    @Column(name = "startTime")
    private LocalDateTime start;
    @Id
    @Column(name = "endTime")
    private LocalDateTime end;

    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Schedule schedule = (Schedule) o;
        return trip.equals(schedule.trip) && start.equals(schedule.start) && end.equals(schedule.end);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trip, start, end);
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "trip=" + trip +
                ", start=" + start +
                ", end=" + end +
                ", description='" + description + '\'' +
                '}';
    }
}
