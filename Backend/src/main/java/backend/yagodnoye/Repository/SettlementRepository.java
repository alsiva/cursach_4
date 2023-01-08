package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.IdClasses.SettlementID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettlementRepository extends JpaRepository<Settlement, SettlementID> {
}
