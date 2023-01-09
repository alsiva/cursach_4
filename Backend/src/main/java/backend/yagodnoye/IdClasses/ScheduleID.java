package backend.yagodnoye.IdClasses;

import backend.yagodnoye.Entities.Trip;
import org.springframework.cglib.core.Local;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class ScheduleID implements Serializable {

    private Trip trip;
    private LocalDateTime start;
    private LocalDateTime end;

    public ScheduleID(){

    }
    public ScheduleID(Trip trip, LocalDateTime start, LocalDateTime end){
        this.trip = trip;
        this.start = start;
        this.end = end;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScheduleID that = (ScheduleID) o;
        return trip.equals(that.trip) && start.equals(that.start) && end.equals(that.end);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trip, start, end);
    }
}
