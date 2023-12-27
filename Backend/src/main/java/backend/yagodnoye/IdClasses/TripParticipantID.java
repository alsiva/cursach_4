package backend.yagodnoye.IdClasses;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class TripParticipantID implements Serializable {
    private BerryPerson berryPerson;
    private Trip trip;
}
