package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Entities.HouseCreateDto;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Services.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class HouseController {

    private HouseService houseService;

    public HouseController(HouseService service){
        houseService = service;
    }

    @GetMapping("/houses")
    public ResponseEntity<?> getHouses(){
        return ResponseEntity.ok(houseService.getAllHouses());
    }

    @PostMapping("/houses")
    public ResponseEntity<?> createHouse(@RequestBody HouseCreateDto houseCreateDto) throws AlreadyExistsException {
        return ResponseEntity.ok(houseService.createHouse(houseCreateDto.getName(), houseCreateDto.getMaxPeople()));
    }
}
