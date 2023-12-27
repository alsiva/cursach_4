package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Services.BerryPersonService;
import backend.yagodnoye.Services.TripParticipantService;
import backend.yagodnoye.Services.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/trips/{tripID}")
@RequiredArgsConstructor
public class TripParticipantController {

    private final TripParticipantService service;
    private final BerryPersonService berryPersonService;
    private final TripService tripService;


    @PutMapping("/application") //personID, letter
    public ResponseEntity<?> addTripParticipant(
            @PathVariable("tripID") Long tripId,
            @RequestParam(name = "letter") String letter
    ) throws PersonNotFoundException, AlreadyExistsException, TripNotFoundException {
        BerryPerson berryPerson = berryPersonService.findByCredential(SecurityContextHolder.getContext().getAuthentication().getName()) ;
        return ResponseEntity.ok(service.addTripParticipant(berryPerson, tripService.findTripById(tripId), letter));
    }

    @GetMapping("/application") //personID
    public ResponseEntity<?> getTripParticipant(@PathVariable Long tripID, @RequestParam(name = "personID") Long personID) throws PersonNotFoundException, TripNotFoundException {
        return ResponseEntity.ok(service.getTripParticipant(berryPersonService.findById(personID), tripService.findTripById(tripID)));
    }

    @GetMapping("/users") //
    public ResponseEntity<?> getAllTripParticipants(@PathVariable Long tripID) throws TripNotFoundException {
        return ResponseEntity.ok(service.getAllTripParticipants(tripService.findTripById(tripID)));
    }

    @PutMapping("/users") //personID
    public ResponseEntity<?> approveTripParticipant(@PathVariable(name = "tripID") Long tripID, @RequestParam(name = "personID") Long personId) throws PersonNotFoundException, TripNotFoundException {
        service.approveTripParticipant(berryPersonService.findById(personId), tripService.findTripById(tripID));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users") //personID
    public ResponseEntity<?> refuseTripParticipant(@PathVariable(name = "tripID") Long tripID, @RequestParam(name = "personID") Long personID) throws PersonNotFoundException, TripNotFoundException {
        service.refuseTripParticipant(berryPersonService.findById(personID), tripService.findTripById(tripID));
        return ResponseEntity.ok().build();
    }

}
