package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.Schedule;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.ScheduleNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    private ScheduleRepository repository;
    private TripService tripService;

    public ScheduleService(ScheduleRepository repository, TripService tripService){
        this.repository = repository;
        this.tripService = tripService;
    }
    public List<Schedule> getSchedule(Long tripID) throws TripNotFoundException {
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException();
        return repository.findByTrip_IdEquals(tripID);
    }

    public void deleteSchedule(Long tripID, LocalDateTime startTime, LocalDateTime endTime) throws TripNotFoundException, ScheduleNotFoundException {
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException();
        Optional<Schedule> scheduleOptional = repository.findByTrip_IdEqualsAndStartEqualsAndEndEquals(tripID, startTime, endTime);
        if (scheduleOptional.isEmpty()) throw new ScheduleNotFoundException();
        repository.delete(scheduleOptional.get());
    }

    public Schedule addSchedule(Long tripID, LocalDateTime startTime, LocalDateTime endTime, String description) throws TripNotFoundException, AlreadyExistsException {
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException();
        Optional<Schedule> scheduleOptional = repository.findByTrip_IdEqualsAndStartEqualsAndEndEquals(tripID, startTime, endTime);
        if(scheduleOptional.isPresent()) throw new AlreadyExistsException();
        return repository.save(new Schedule(tripService.findTripById(tripID), startTime, endTime, description));
    }
}
