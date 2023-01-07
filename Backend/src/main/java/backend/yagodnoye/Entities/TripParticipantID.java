package backend.yagodnoye.Entities;

import java.io.Serializable;
import java.util.Objects;

public class TripParticipantID implements Serializable {
    private BerryPerson berryPerson;
    private Trip trip;

    public TripParticipantID() {
    }

    public TripParticipantID(BerryPerson berryPerson, Trip trip) {
        this.berryPerson = berryPerson;
        this.trip = trip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TripParticipantID that = (TripParticipantID) o;
        return berryPerson.equals(that.berryPerson) && trip.equals(that.trip);
    }

    @Override
    public int hashCode() {
        return Objects.hash(berryPerson, trip);
    }
}
