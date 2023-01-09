package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Entities.TripParticipant;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Services.BerryPersonService;
import backend.yagodnoye.Services.TripParticipantService;
import backend.yagodnoye.Services.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trips/{tripID}")
public class TripParticipantController {
    private Trip trip;

    private final TripParticipantService service;
    private final BerryPersonService berryPersonService;
    private final TripService tripService;

    public TripParticipantController(TripParticipantService service, BerryPersonService berryPersonService, TripService tripService) {
        this.service = service;
        this.berryPersonService = berryPersonService;
        this.tripService = tripService;
    }

    @PostMapping("/application") //personID, letter
    public TripParticipant addTripParticipant(
            @RequestParam(name = "personID") Long berryPersonId,
            @PathVariable("tripID") Long tripId,
            @RequestParam(name = "letter") String letter
    ) throws PersonNotFoundException, AlreadyExistsException, TripNotFoundException {
        return service.addTripParticipant(berryPersonService.findById(berryPersonId), tripService.findTripById(tripId), letter);
    }

    @GetMapping("/application") //personID
    public TripParticipant getTripParticipant(@PathVariable Long tripID, @RequestParam(name = "personID") Long personID) throws PersonNotFoundException, TripNotFoundException {
        return service.getTripParticipant(berryPersonService.findById(personID), tripService.findTripById(tripID));
    }

    @GetMapping("/users") //
    public List<TripParticipant> getAllTripParticipants(@PathVariable Long tripID) throws TripNotFoundException {
        return service.getAllTripParticipants(tripService.findTripById(tripID));
    }

    @PutMapping("/users") //personID
    public void approveTripParticipant(@PathVariable(name = "tripID") Long tripID, @RequestParam(name = "personID") Long personId) throws PersonNotFoundException, TripNotFoundException {
        service.approveTripParticipant(berryPersonService.findById(personId), tripService.findTripById(tripID));
    }

    @DeleteMapping("/users") //personID
    public void refuseTripParticipant(@PathVariable(name = "tripID") Long tripID, @RequestParam(name = "personID") Long personID) throws PersonNotFoundException, TripNotFoundException {
        service.refuseTripParticipant(berryPersonService.findById(personID), tripService.findTripById(tripID));
    }

}
