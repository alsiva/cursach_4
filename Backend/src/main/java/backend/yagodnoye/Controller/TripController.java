package backend.yagodnoye.Controller;

import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Services.BerryPersonService;
import backend.yagodnoye.Services.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class TripController {

    private final TripService service;
    private final BerryPersonService berryPersonService;

    @GetMapping("/trips")
    public ResponseEntity<?> getTrips(){
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("/trips")
    public ResponseEntity<?> addTrip(
            @RequestParam(name="name") String name,
            @RequestParam(name="description") String description,
            @RequestParam(name="startDate") String startDateStr,
            @RequestParam(name="endDate") String endDateStr,
            @RequestParam(name="mainOrganizerUsername") String mainOrganizerUserName
    ) throws PersonNotFoundException, WrongParametersException {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);
        return ResponseEntity.ok(service.addTrip(name, description, startDate, endDate, berryPersonService.findByUsername(mainOrganizerUserName)));
    }

    @DeleteMapping("/trips")
    public ResponseEntity<?> deleteTrip(@RequestParam(name = "id") String id) throws WrongParametersException {
        service.deleteTrip(Long.parseLong(id));
        return ResponseEntity.ok().build();
    }
}
