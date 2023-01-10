package backend.yagodnoye.Repository;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.IdClasses.SettlementID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface SettlementRepository extends JpaRepository<Settlement, SettlementID> {
    Optional<Settlement> findByTripEqualsAndHouseEqualsAndBerryPersonEquals(Trip trip, House house, BerryPerson berryPerson);
    @Query("select s from Settlement s where s.trip.id = ?1 and s.berryPerson.id = ?2 and s.house.id = ?3")
    Optional<Settlement> findByTrip_IdEqualsAndBerryPerson_IdEqualsAndHouse_IdEquals(@NonNull Long id, Long id1, Long id2);
    List<Settlement> findByTrip_IdAndHouse_Id(@NonNull Long id, @NonNull Long id1);
    @Query("select s from Settlement s where s.trip.id = ?1")
    List<Settlement> findByTrip_IdEquals(@NonNull Long id);
}
