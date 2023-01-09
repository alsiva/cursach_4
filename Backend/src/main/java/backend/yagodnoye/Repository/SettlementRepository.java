package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.IdClasses.SettlementID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

public interface SettlementRepository extends JpaRepository<Settlement, SettlementID> {
    List<Settlement> findByTrip_IdAndHouse_Id(@NonNull Long id, @NonNull Long id1);
    @Query("select s from Settlement s where s.trip.id = ?1")
    List<Settlement> findByTrip_IdEquals(@NonNull Long id);
}
