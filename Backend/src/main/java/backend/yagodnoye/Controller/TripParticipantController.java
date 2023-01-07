package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Entities.TripParticipant;
import backend.yagodnoye.Services.AuthorizationService;
import backend.yagodnoye.Services.TripParticipantService;
import backend.yagodnoye.Services.TripService;
import jakarta.websocket.server.PathParam;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trips/{tripID}")
public class TripParticipantController {
    private Trip trip;

    private final TripParticipantService service;
    private final AuthorizationService authorizationService;
    private final TripService tripService;

    public TripParticipantController(TripParticipantService service, AuthorizationService authorizationService, TripService tripService) {
        this.service = service;
        this.authorizationService = authorizationService;
        this.tripService = tripService;
    }

    @PostMapping("/application")
    public TripParticipant addTripParticipant(
            @RequestParam(name = "personID") String berryPersonIdStr,
            @PathVariable("tripID") String tripIdStr,
            @RequestParam(name = "letter") String letter
    ){
        return service.addTripParticipant(authorizationService.findById(Long.parseLong(berryPersonIdStr)), tripService.findTripById(Long.parseLong(tripIdStr)), letter);
    }

    @GetMapping("/application")
    public TripParticipant getTripParticipant(@PathVariable String tripID, @RequestParam(name = "personID") String personIDStr){
        return service.getTripParticipant(authorizationService.findById(Long.parseLong(personIDStr)), tripService.findTripById(Long.parseLong(tripID)));
    }

    @GetMapping("/users")
    public List<TripParticipant> getAllTripParticipants(@PathVariable String tripID){
        return service.getAllTripParticipants(tripService.findTripById(Long.parseLong(tripID)));
    }

    @PostMapping("/users/{personID}")
    public void approveTripParticipant(@PathVariable(name = "tripID") String tripID, @PathVariable(name = "personID") String personIdStr){
        System.out.println(personIdStr + " is the ID you are searching for in the trip" + tripID);
        service.approveTripParticipant(authorizationService.findById(Long.parseLong(personIdStr)), tripService.findTripById(Long.parseLong(tripID)));
    }

    @DeleteMapping("/users/{personID}")
    public void refuseTripParticipant(@PathVariable(name = "tripID") String tripID, @PathVariable(name = "personID") String personIDStr){
        service.refuseTripParticipant(authorizationService.findById(Long.parseLong(personIDStr)), tripService.findTripById(Long.parseLong((tripID))));

    }

}
