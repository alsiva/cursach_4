package backend.yagodnoye.Entities;


import backend.yagodnoye.IdClasses.SettlementID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="settlement")
@IdClass(SettlementID.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

}
