package backend.yagodnoye.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rights")
@NoArgsConstructor
@Getter
@Setter
public class Rights {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rights_gen")
    @SequenceGenerator(name = "rights_gen", sequenceName = "rights_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RightsEnum name;

    public Rights(String name){
        this.name = RightsEnum.valueOf(name);
    }

}
