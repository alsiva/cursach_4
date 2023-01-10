package backend.yagodnoye.Entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name="berryperson")
public class BerryPerson {
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
    private int rightId;
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
    @Column(unique = true)
    private String vk;

    @OneToMany(mappedBy = "mainOrganizer", cascade = CascadeType.DETACH)
    private Collection<Trip> organizingTrips;

    public BerryPerson(){
    }

    public BerryPerson(int rightId, String email, String username, String password, String name, String surname, Sex sex, LocalDate dateOfBirth, String telegram, String vk){
        this.rightId = rightId;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.telegram = telegram;
        this.vk = vk;
    }

    public int getRightId() {
        return rightId;
    }
    public String getEmail(){return email;}
    @Column()
    public String getUsername() {return username;}

    public void setRightId(int rightId) {
        this.rightId = rightId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getTelegram() {
        return telegram;
    }

    public void setTelegram(String telegram) {
        this.telegram = telegram;
    }

    public String getVk() {
        return vk;
    }

    public void setVk(String vk) {
        this.vk = vk;
    }

    public Long getId() {
        return id;
    }


    @Override
    public String toString() {
        return "BerryPerson{" +
                "id=" + id +
                ", rightId=" + rightId +
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
        return rightId == that.rightId && email.equals(that.email) && username.equals(that.username) && password.equals(that.password) && name.equals(that.name) && surname.equals(that.surname) && sex == that.sex && dateOfBirth.equals(that.dateOfBirth) && Objects.equals(telegram, that.telegram) && Objects.equals(vk, that.vk) && Objects.equals(organizingTrips, that.organizingTrips);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, username, rightId, password, name, surname, sex, dateOfBirth, telegram, vk, organizingTrips);
    }
}
