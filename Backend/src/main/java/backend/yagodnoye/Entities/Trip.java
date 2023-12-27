package backend.yagodnoye.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "trip")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trip_gen")
    @SequenceGenerator(name = "trip_gen", sequenceName = "trip_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)

    private LocalDate endDate;


    @ManyToOne(cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "mainOrganizer_id", nullable = false)
    private BerryPerson mainOrganizer;

    public Trip(String name, String description, LocalDate startDate, LocalDate endDate, BerryPerson mainOrganizer) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mainOrganizer = mainOrganizer;
    }
}
