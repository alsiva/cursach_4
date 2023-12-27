package backend.yagodnoye.Services.validators;

import backend.yagodnoye.Exceptions.WrongParametersException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class GenericValidator {

    public void validateId(Long id) throws WrongParametersException {
        if (id <= 0) throw new WrongParametersException("Id must be a positive number");
    }

    public void validateDateTime(LocalDateTime start, LocalDateTime end) throws WrongParametersException {
        if (start.isBefore(LocalDateTime.now())) throw new WrongParametersException("Start can't be before now");
        if (end.isBefore(start)) throw new WrongParametersException("Start date time is not before the end");
    }

    public void validateDate(LocalDate start, LocalDate end) throws WrongParametersException {
        if (start.isBefore(LocalDate.now())) throw new WrongParametersException("Start can't be before now");
        if (end.isBefore(start)) throw new WrongParametersException("Start date time is not before the end");
    }

    public void validateHouseParam(String name, int maxPeople) throws WrongParametersException {
        if (name.length() < 2) throw new WrongParametersException("House name at least 2 letters");
        if (maxPeople < 1) throw new WrongParametersException("House should have at least one person space");
    }
}
