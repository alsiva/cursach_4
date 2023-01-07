package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    @Query("select t from Trip t where t.id = ?1")
    Trip findByIdEquals(@NonNull Long id);
    @Transactional
    @Modifying
    @Query("delete from Trip t where t.id = ?1")
    int deleteByIdEquals(@NonNull Long id);
    @Override
    List<Trip> findAll();
}
