package backend.yagodnoye.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "rights")
public class Rights {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rights_gen")
    @SequenceGenerator(name = "rights_gen", sequenceName = "rights_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RightsEnum name;

    public Rights(){

    }

    public Rights(String name){
        this.name = RightsEnum.valueOf(name);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
