package backend.yagodnoye.Entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "trip")
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


    public Trip() {
    }

    public Trip(String name, String description, LocalDate startDate, LocalDate endDate, BerryPerson mainOrganizer) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mainOrganizer = mainOrganizer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BerryPerson getMainOrganizer() {
        return mainOrganizer;
    }

    public void setMainOrganizer(BerryPerson mainOrganizer) {
        this.mainOrganizer = mainOrganizer;
    }

    public Long getMainOrganizerID() {
        return mainOrganizer.getId();
    }
}
