package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Schedule;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.ScheduleNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Services.ScheduleService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedList;

@RestController
@RequestMapping("/trips/{tripID}")
public class ScheduleController {

    private ScheduleService service;

    public ScheduleController(ScheduleService service){
        this.service = service;
    }

    @GetMapping("/schedule")
    public LinkedList<Schedule> getSchedule(
            @PathVariable(name = "tripID") Long tripID
    ) throws TripNotFoundException {
        return service.getSchedule(tripID);
    }

    @DeleteMapping("/schedule")
    public void deleteSchedule(
            @PathVariable(name = "tripID") Long tripID,
            @RequestParam(name="startTime") LocalDateTime startTime,
            @RequestParam(name="endTime") LocalDateTime endTime
            ) throws ScheduleNotFoundException, TripNotFoundException {
        service.deleteSchedule(tripID, startTime, endTime);
    }

    @PostMapping("/schedule")
    public Schedule addSchedule(
            @PathVariable(name = "tripID") Long tripID,
            @RequestParam(name = "startTime") LocalDateTime startTime,
            @RequestParam(name = "endTime") LocalDateTime endTime
    ) throws AlreadyExistsException, TripNotFoundException {
        return service.addSchedule(tripID, startTime, endTime);
    }
}
