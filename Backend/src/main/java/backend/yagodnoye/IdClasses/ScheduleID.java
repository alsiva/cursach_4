package backend.yagodnoye.IdClasses;

import backend.yagodnoye.Entities.Trip;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDateTime;

@AllArgsConstructor
@EqualsAndHashCode
public class ScheduleID implements Serializable {

    private Trip trip;
    private LocalDateTime start;
    private LocalDateTime end;

}
