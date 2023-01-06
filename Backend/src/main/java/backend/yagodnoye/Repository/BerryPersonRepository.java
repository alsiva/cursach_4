package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.BerryPersonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface BerryPersonRepository extends JpaRepository<BerryPerson, BerryPersonId> {
    @Query("select b from BerryPerson b where b.email like ?1 and b.password like ?2")
    BerryPerson findByEmailLikeAndPasswordLike(@NonNull String email, @NonNull String password);
    @Query("select b from BerryPerson b where b.username like ?1 and b.password like ?2")
    BerryPerson findByUsernameLikeAndPasswordLike(@NonNull String username, String password);
    BerryPerson findByNameLikeIgnoreCaseAndPasswordLike(@NonNull String name, @NonNull String password);

}