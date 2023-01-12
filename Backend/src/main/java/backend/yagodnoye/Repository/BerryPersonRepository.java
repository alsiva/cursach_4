package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.BerryPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BerryPersonRepository extends JpaRepository<BerryPerson, Long> {
    Optional<BerryPerson> findByUsernameLikeIgnoreCaseOrEmailLikeIgnoreCase(@NonNull String username, @NonNull String email);
    Optional<BerryPerson> findByEmailLikeAllIgnoreCase(@NonNull String email);
    Optional<BerryPerson> findByEmailLikeIgnoreCase(@NonNull String email);
    Optional<BerryPerson> findByEmailLikeIgnoreCaseAndPasswordLike(@NonNull String email, @NonNull String password);
    Optional<BerryPerson> findByUsernameLikeIgnoreCaseAndPasswordLike(@NonNull String username, @NonNull String password);
    Optional<BerryPerson> findFirstByNameIgnoreCaseOrderBySurnameAsc(@NonNull String name);
    Optional<BerryPerson> findByUsernameLikeIgnoreCase(@NonNull String username);
    Optional<BerryPerson> findByIdEquals(@NonNull Long id);


}
