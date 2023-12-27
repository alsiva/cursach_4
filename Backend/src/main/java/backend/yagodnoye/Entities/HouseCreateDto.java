package backend.yagodnoye.Entities;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class HouseCreateDto {
    private String name;
    private int maxPeople;
}
