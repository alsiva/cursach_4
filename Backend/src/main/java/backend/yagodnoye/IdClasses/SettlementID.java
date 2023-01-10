package backend.yagodnoye.IdClasses;


import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Trip;

import java.io.Serializable;
import java.util.Objects;

public class SettlementID implements Serializable {
    private Trip trip;
    private BerryPerson berryPerson;
    private House house;

    public SettlementID() {
    }

    public SettlementID(Trip trip, BerryPerson berryPerson, House house) {
        this.trip = trip;
        this.berryPerson = berryPerson;
        this.house = house;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SettlementID that = (SettlementID) o;
        return trip.equals(that.trip) && berryPerson.equals(that.berryPerson) && house.equals(that.house);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trip, berryPerson, house);
    }
}
