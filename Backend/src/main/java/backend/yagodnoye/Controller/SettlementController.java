package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.Settlement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/trips/{tripID}")
public class SettlementController {

    @GetMapping("/settlement")
    public List<Settlement>

}
