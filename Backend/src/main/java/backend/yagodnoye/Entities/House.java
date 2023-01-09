package backend.yagodnoye.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "house")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "house_gen")
    @SequenceGenerator(name = "house_gen", sequenceName = "house_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private int maxPeople;

    public House() {
    }

    public House(String name, int maxPeople) {
        this.name = name;
        this.maxPeople = maxPeople;
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

    public int getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(int maxPeople) {
        this.maxPeople = maxPeople;
    }
}
