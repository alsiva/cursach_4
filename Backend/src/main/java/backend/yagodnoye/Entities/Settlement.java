package backend.yagodnoye.Entities;


import backend.yagodnoye.IdClasses.SettlementID;
import jakarta.persistence.*;

@Entity
@Table(name="settlement")
@IdClass(SettlementID.class)
public class Settlement {
    @Id
    @ManyToOne(optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Id
    @ManyToOne(optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name = "berry_person_id", nullable = false)
    private BerryPerson berryPerson;

    @Id
    @ManyToOne(optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    public Settlement() {
    }

    public Settlement(Trip trip, BerryPerson berryPerson, House house) {
        this.trip = trip;
        this.berryPerson = berryPerson;
        this.house = house;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public BerryPerson getBerryPerson() {
        return berryPerson;
    }

    public void setBerryPerson(BerryPerson berryPerson) {
        this.berryPerson = berryPerson;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}
