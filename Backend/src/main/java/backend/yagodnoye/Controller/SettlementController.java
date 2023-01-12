package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Settlement;
import backend.yagodnoye.Exceptions.HouseIsFullException;
import backend.yagodnoye.Exceptions.HouseNotFoundException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Services.SettlementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/trips/{tripID}")
public class SettlementController {

    private final SettlementService service;
    public SettlementController(SettlementService service){
        this.service = service;
    }
    @GetMapping("/settlement")
    public List<Settlement> getSettlement(
            @PathVariable(name = "tripID") String tripID
    ){
        return service.getSettlement(Long.parseLong(tripID));
    }

    @PutMapping("/settlement")
    public Settlement settleBerryPerson(
            @RequestParam(name = "houseID") Long houseID,
            @RequestParam(name = "personID") Long personID,
            @PathVariable(name = "tripID") Long tripID
    ) throws HouseNotFoundException, PersonNotFoundException, HouseIsFullException, TripNotFoundException {
        return service.settleBerryPerson(tripID, personID, houseID);
    }

    @DeleteMapping("/settlement")
    public void unSettlePerson(
            @PathVariable(name = "tripID") Long tripID,
            @RequestParam(name = "personID") Long personID,
            @RequestParam(name = "houseID") Long houseID
    ) throws HouseNotFoundException, PersonNotFoundException, TripNotFoundException {
        service.unSettlePerson(tripID, personID, houseID);
    }

}
