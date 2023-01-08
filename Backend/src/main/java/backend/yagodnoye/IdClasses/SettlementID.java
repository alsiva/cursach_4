package backend.yagodnoye.IdClasses;


import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Trip;

import java.io.Serializable;
import java.util.Objects;

public class SettlementID implements Serializable {
    private Trip trip;
    private BerryPerson person;
    private House house;

    public SettlementID() {
    }

    public SettlementID(Trip trip, BerryPerson person, House house) {
        this.trip = trip;
        this.person = person;
        this.house = house;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SettlementID that = (SettlementID) o;
        return trip.equals(that.trip) && person.equals(that.person) && house.equals(that.house);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trip, person, house);
    }
}
