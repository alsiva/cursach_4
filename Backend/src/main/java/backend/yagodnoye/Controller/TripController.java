package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Trip;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Services.BerryPersonService;
import backend.yagodnoye.Services.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/")
public class TripController {

    private final TripService service;
    private final BerryPersonService berryPersonService;

    @Autowired
    public TripController(TripService service, BerryPersonService berryPersonRepository) {
        this.service = service;
        this.berryPersonService = berryPersonRepository;
    }

    @GetMapping("/trips")
    public List<Trip> getTrips(){
        return service.findAll();
    }

    @PostMapping("/trips")
    public Trip addTrip(
            @RequestParam(name="name") String name,
            @RequestParam(name="description") String description,
            @RequestParam(name="startDate") String startDateStr,
            @RequestParam(name="endDate") String endDateStr,
            @RequestParam(name="mainOrganizerUsername") String mainOrganizerUserName
    ) throws PersonNotFoundException, WrongParametersException {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);
        return service.addTrip(name, description, startDate, endDate, berryPersonService.findByUsername(mainOrganizerUserName));
    }

    @DeleteMapping("/trips")
    public int deleteTrip(@RequestParam(name = "id") String id){
        return service.deleteTrip(Long.parseLong(id));
    }
}
