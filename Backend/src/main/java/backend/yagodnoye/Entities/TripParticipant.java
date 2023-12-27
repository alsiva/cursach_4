package backend.yagodnoye.Entities;

import backend.yagodnoye.IdClasses.TripParticipantID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tripparticipant")
@IdClass(TripParticipantID.class)
@AllArgsConstructor
@NoArgsConstructor
public class TripParticipant {
    @Id
    @ManyToOne(optional = false, cascade = CascadeType.REMOVE)
    private BerryPerson berryPerson;

    @Id
    @ManyToOne(cascade = CascadeType.REMOVE)
    private Trip trip;

    private String letter;
    private boolean approved;

}
