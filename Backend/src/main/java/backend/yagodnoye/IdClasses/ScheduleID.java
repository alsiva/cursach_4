package backend.yagodnoye.IdClasses;

import backend.yagodnoye.Entities.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class ScheduleID implements Serializable {

    private Trip trip;
    private LocalDateTime start;
    private LocalDateTime end;

}
