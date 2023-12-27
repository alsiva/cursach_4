package backend.yagodnoye.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="berryperson")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BerryPerson implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "berry_person_sequence",
            allocationSize = 1,
            sequenceName = "berry_person_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "berry_person_sequence"
    )
    private Long id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;

    @OneToOne(cascade = CascadeType.DETACH)
    private Rights right;

    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    @Column(nullable = false)
    private LocalDate dateOfBirth;
    @Column(unique = true)
    private String telegram;
    @Setter
    @Column(unique = true)
    private String vk;

    @OneToMany(mappedBy = "mainOrganizer", cascade = CascadeType.DETACH)
    private Collection<Trip> organizingTrips;

    public BerryPerson(String email, String username,  String password, String name, String surname, Sex sex, LocalDate dateOfBirth, String telegram, String vk) {
        this.email = email;
        this.username = username;
        this.right = new Rights("normal");
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.telegram = telegram;
        this.vk = vk;
        this.organizingTrips = new HashSet<>();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }


    @Override
    public String toString() {
        return "BerryPerson{" +
                "id=" + id +
                ", rightId=" + getRight().getId() +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", sex=" + sex +
                ", dateOfBirth=" + dateOfBirth +
                ", telegram='" + telegram + '\'' +
                ", vk='" + vk + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BerryPerson that = (BerryPerson) o;
        return Objects.equals(getRight().getId(), that.getRight().getId()) && email.equals(that.email) && username.equals(that.username) && password.equals(that.password) && name.equals(that.name) && surname.equals(that.surname) && sex == that.sex && dateOfBirth.equals(that.dateOfBirth) && Objects.equals(telegram, that.telegram) && Objects.equals(vk, that.vk) && Objects.equals(organizingTrips, that.organizingTrips);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, username, getRight().getId(), password, name, surname, sex, dateOfBirth, telegram, vk, organizingTrips);
    }
}
