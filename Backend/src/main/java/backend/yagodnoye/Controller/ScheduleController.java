package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Schedule;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.ScheduleNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Services.ScheduleService;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/trips/{tripID}")
public class ScheduleController {

    private final ScheduleService service;

    public ScheduleController(ScheduleService service){
        this.service = service;
    }

    @GetMapping("/schedule")
    public List<Schedule> getSchedule(
            @PathVariable(name = "tripID") Long tripID
    ) throws TripNotFoundException {
        return service.getSchedule(tripID);
    }

    @DeleteMapping("/schedule")
    public void deleteSchedule(
            @PathVariable(name = "tripID") Long tripID,
            @RequestParam(name="startTime") String startTimeStr,
            @RequestParam(name="endTime") String endTimeStr
            ) throws ScheduleNotFoundException, TripNotFoundException {
        LocalDateTime startTime = LocalDateTime.parse(startTimeStr);
        LocalDateTime endTime = LocalDateTime.parse(endTimeStr);
        service.deleteSchedule(tripID, startTime, endTime);
    }

    @PostMapping("/schedule")
    public Schedule addSchedule(
            @PathVariable(name = "tripID") Long tripID,
            @RequestParam(name = "startTime") String startTimeStr,
            @RequestParam(name = "endTime") String endTimeStr,
            @RequestParam(name = "description") String description
    ) throws AlreadyExistsException, TripNotFoundException {
        LocalDateTime startTime = LocalDateTime.parse(startTimeStr);
        LocalDateTime endTime = LocalDateTime.parse(endTimeStr);
        return service.addSchedule(tripID, startTime, endTime, description);
    }
}
