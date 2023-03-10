package backend.yagodnoye.Entities;

import backend.yagodnoye.IdClasses.ScheduleID;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "tripschedule")
@IdClass(ScheduleID.class)
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

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
