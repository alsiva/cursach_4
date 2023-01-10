package backend.yagodnoye.Entities;

import backend.yagodnoye.IdClasses.ScheduleID;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "schedule")
@IdClass(ScheduleID.class)
public class Schedule {
    @Id
    @ManyToOne(optional = false, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Id
    private LocalDateTime start;
    @Id
    private LocalDateTime end;

    private String description;

    public Schedule() {
    }

    public Schedule(Trip trip, LocalDateTime start, LocalDateTime end, String description) {
        this.trip = trip;
        this.start = start;
        this.end = end;
        this.description = description;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

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

}
