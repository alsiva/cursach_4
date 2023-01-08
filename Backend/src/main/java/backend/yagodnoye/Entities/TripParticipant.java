package backend.yagodnoye.Entities;

import backend.yagodnoye.IdClasses.TripParticipantID;
import jakarta.persistence.*;

@Entity
@Table(name = "tripparticipant")
@IdClass(TripParticipantID.class)
public class TripParticipant {
    @Id
    @ManyToOne
    private BerryPerson berryPerson;

    @Id
    @ManyToOne
    private Trip trip;

    private String letter;
    private boolean approved;

    public TripParticipant() {
    }

    public TripParticipant(BerryPerson berryPerson, Trip trip, String letter, boolean approved) {
        this.berryPerson = berryPerson;
        this.trip = trip;
        this.letter = letter;
        this.approved = approved;
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

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
