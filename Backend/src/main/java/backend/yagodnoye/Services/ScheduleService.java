package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.Schedule;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.ScheduleNotFoundException;
import backend.yagodnoye.Exceptions.TripNotFoundException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Repository.ScheduleRepository;
import backend.yagodnoye.Services.validators.GenericValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository repository;
    private final TripService tripService;
    private final GenericValidator validator;

    public List<Schedule> getSchedule(Long tripID) throws TripNotFoundException, WrongParametersException {
        validator.validateId(tripID);
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException("Trip with id = " + tripID + " was not found");
        return repository.findByTrip_IdEquals(tripID);
    }

    public void deleteSchedule(Long tripID, LocalDateTime startTime, LocalDateTime endTime) throws TripNotFoundException, ScheduleNotFoundException, WrongParametersException {
        validator.validateId(tripID);
        validator.validateDateTime(startTime, endTime);
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException("Trip with id = " + tripID + " was not found");
        Optional<Schedule> scheduleOptional = repository.findByTrip_IdEqualsAndStartEqualsAndEndEquals(tripID, startTime, endTime);
        if (scheduleOptional.isEmpty()) throw new ScheduleNotFoundException("Schedule starting " + startTime + " and ending " + endTime + " was not found");
        repository.delete(scheduleOptional.get());
    }

    public Schedule addSchedule(Long tripID, LocalDateTime startTime, LocalDateTime endTime, String description) throws TripNotFoundException, AlreadyExistsException, WrongParametersException {
        validator.validateId(tripID);
        validator.validateDateTime(startTime, endTime);
        if (!tripService.tripExists(tripID)) throw new TripNotFoundException("Trip with id = " + tripID + " was not found");
        Optional<Schedule> scheduleOptional = repository.findByTrip_IdEqualsAndStartEqualsAndEndEquals(tripID, startTime, endTime);
        if(scheduleOptional.isPresent()) throw new AlreadyExistsException("Schedule starting " + startTime + " and ending " + endTime + " was not found");
        return repository.save(new Schedule(tripService.findTripById(tripID), startTime, endTime, description));
    }
}
