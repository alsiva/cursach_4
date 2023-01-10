package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Sex;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Exceptions.RegisterException;
import backend.yagodnoye.Services.BerryPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.regex.Pattern;

@RestController
@RequestMapping(path = "/")
public class BerryPersonController {

    private final BerryPersonService service;
    String emailPattern = "^(.+)@(\\S+)$";

    @Autowired
    public BerryPersonController(BerryPersonService service){
        this.service = service;
    }

    @PostMapping("/login")
    @ResponseBody
    public BerryPerson login(@RequestParam(name="credential") String credential, @RequestParam(name="password") String password) throws PersonNotFoundException {
        if (Pattern.compile(emailPattern).matcher(credential).matches())
            return service.loginByEmail(credential, password);
        return service.loginByUsername(credential, password);
    }

    @PostMapping("/users")
    @ResponseBody
    public BerryPerson register(
             @RequestParam(name="email") String email,
             @RequestParam(name="username") String username,
             @RequestParam(name="password") String password,
             @RequestParam(name="name") String name,
             @RequestParam(name="surname") String surname,
             @RequestParam(name="sex") String sex,
             @RequestParam(name="dateOfBirth") String dateOfBirth,
             @RequestParam(name="telegram") String telegram,
             @RequestParam(name="vk") String vk) throws RegisterException {
        LocalDate date = LocalDate.parse(dateOfBirth);
        int rightId = 1;
        Sex gender = Sex.valueOf(sex);
        String telegram1 = telegram.equals("") ? null : telegram;
        String vk1 = vk.equals("") ? null:vk;
        return service.register(rightId, email, username, password, name, surname, gender, date, telegram1, vk1);
    }
}
