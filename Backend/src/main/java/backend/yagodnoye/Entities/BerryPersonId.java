package backend.yagodnoye.Entities;

import java.io.Serializable;
import java.util.Objects;

public class BerryPersonId implements Serializable {
    private Long id;
    private String email;
    private String username;

    public BerryPersonId() {
    }

    public BerryPersonId(Long id, String email, String username){
        this.id = id;
        this.email = email;
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BerryPersonId that = (BerryPersonId) o;
        return id.equals(that.id) && email.equals(that.email) && username.equals(that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, username);
    }
}
