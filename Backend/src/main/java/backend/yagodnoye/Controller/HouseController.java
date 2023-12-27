package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.HouseCreateDto;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Services.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class HouseController {

    private final HouseService houseService;

    @GetMapping("/houses")
    public ResponseEntity<?> getHouses(){
        return ResponseEntity.ok(houseService.getAllHouses());
    }

    @PostMapping("/houses")
    public ResponseEntity<?> createHouse(@RequestBody HouseCreateDto houseCreateDto) throws AlreadyExistsException {
        return ResponseEntity.ok(houseService.createHouse(houseCreateDto.getName(), houseCreateDto.getMaxPeople()));
    }
}
