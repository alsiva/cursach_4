package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.Rights;
import backend.yagodnoye.Entities.RightsEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface RightsRepository extends JpaRepository<Rights, Long> {
    @Query("select r from Rights r where r.name = ?1")
    Optional<Rights> findByNameEquals(@NonNull RightsEnum name);


}
