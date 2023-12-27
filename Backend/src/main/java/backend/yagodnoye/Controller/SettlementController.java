package backend.yagodnoye.Controller;

import backend.yagodnoye.Exceptions.*;
import backend.yagodnoye.Services.SettlementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/trips/{tripID}")
@RequiredArgsConstructor
public class SettlementController {

    private final SettlementService service;
    @GetMapping("/settlement")
    public ResponseEntity<?> getSettlement(
            @PathVariable(name = "tripID") String tripID
    ) throws WrongParametersException, TripNotFoundException {
        return ResponseEntity.ok(service.getSettlement(Long.parseLong(tripID)));
    }

    @PutMapping("/settlement")
    public ResponseEntity<?> settleBerryPerson(
            @RequestParam(name = "houseID") Long houseID,
            @RequestParam(name = "personID") Long personID,
            @PathVariable(name = "tripID") Long tripID
    ) throws HouseNotFoundException, PersonNotFoundException, HouseIsFullException, TripNotFoundException, WrongParametersException {
        return ResponseEntity.ok(service.settleBerryPerson(tripID, personID, houseID));
    }

    @DeleteMapping("/settlement")
    public ResponseEntity<?> unSettlePerson(
            @PathVariable(name = "tripID") Long tripID,
            @RequestParam(name = "personID") Long personID,
            @RequestParam(name = "houseID") Long houseID
    ) throws HouseNotFoundException, PersonNotFoundException, TripNotFoundException, WrongParametersException {
        service.unSettlePerson(tripID, personID, houseID);
        return ResponseEntity.ok().build();
    }

}
