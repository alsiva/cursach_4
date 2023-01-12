package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Services.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class HouseController {

    private HouseService houseService;

    public HouseController(HouseService service){
        houseService = service;
    }

    @GetMapping("/houses")
    public List<House> getHouses(){
        return houseService.getAllHouses();
    }

}
