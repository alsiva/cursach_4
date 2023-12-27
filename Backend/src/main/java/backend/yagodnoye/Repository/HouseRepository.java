package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface HouseRepository extends JpaRepository<House, Long> {
    @Query("select h from House h where h.id = ?1")
    Optional<House> findByIdEquals(@NonNull Long id);

    boolean existsByNameEqualsIgnoreCase(String name);
}
