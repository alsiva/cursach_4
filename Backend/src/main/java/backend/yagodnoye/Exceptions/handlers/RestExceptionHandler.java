package backend.yagodnoye.Exceptions.handlers;

import backend.yagodnoye.Entities.ErrorBody;
import backend.yagodnoye.Exceptions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {HouseNotFoundException.class})
    public ResponseEntity<?> handleHouseNotFound(HouseNotFoundException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(404)
                .message("House was not found")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(404).body(errorBody);
    }

    @ExceptionHandler(value = {PersonNotFoundException.class})
    public ResponseEntity<?> handlePersonNotFound(PersonNotFoundException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(404)
                .message("Person was not found")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(404).body(errorBody);
    }

    @ExceptionHandler(value = {ScheduleNotFoundException.class})
    public ResponseEntity<?> handleScheduleNotFound(ScheduleNotFoundException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(404)
                .message("Person was not found")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(404).body(errorBody);
    }

    @ExceptionHandler(value = {TripNotFoundException.class})
    public ResponseEntity<?> handleTripNotFound(TripNotFoundException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(404)
                .message("Person was not found")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(404).body(errorBody);
    }

    @ExceptionHandler(value = {AlreadyExistsException.class})
    public ResponseEntity<?> handleAlreadyExists(AlreadyExistsException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(409)
                .message("Resource already exists")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(409).body(errorBody);
    }

    @ExceptionHandler(value = {HouseIsFullException.class})
    public ResponseEntity<?> handleHouseFull(HouseIsFullException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(403)
                .message("House is full")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(403).body(errorBody);
    }

    @ExceptionHandler(value = {RegisterException.class})
    public ResponseEntity<?> handleHouseFull(RegisterException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(409)
                .message("Username already taken")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(409).body(errorBody);
    }

    @ExceptionHandler(value = {WrongParametersException.class})
    public ResponseEntity<?> handleValidationError(WrongParametersException ex){
        ErrorBody errorBody = ErrorBody.builder()
                .statusCode(400)
                .message("Validation error")
                .details(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(400).body(errorBody);
    }
}
