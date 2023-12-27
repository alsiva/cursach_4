package backend.yagodnoye.IdClasses;


import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@AllArgsConstructor
@Data
public class SettlementID implements Serializable {
    private Trip trip;
    private BerryPerson berryPerson;
    private House house;

}
