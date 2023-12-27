package backend.yagodnoye.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "house")
@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "house_gen")
    @SequenceGenerator(name = "house_gen", sequenceName = "house_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private int maxPeople;

    public House(String name, int maxPeople){
        this.name = name;
        this.maxPeople = maxPeople;
    }

}
