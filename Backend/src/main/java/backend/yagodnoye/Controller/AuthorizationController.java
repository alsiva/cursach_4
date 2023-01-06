package backend.yagodnoye.Controller;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Sex;
import backend.yagodnoye.Services.AuthorizationService;
import org.hibernate.WrongClassException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@RequestMapping(path = "/")
public class AuthorizationController {

    private final AuthorizationService service;
    String emailPattern = "^(.+)@(\\S+)$";

    @Autowired
    public AuthorizationController(AuthorizationService service){
        this.service = service;
    }

    @PostMapping("/login")
    @ResponseBody
    public BerryPerson login(@RequestParam(name="credential") String credential, @RequestParam(name="password") String password){
        if (Pattern.compile(emailPattern).matcher(credential).matches())
            return service.loginByEmail(credential, password);
        return service.loginByUsername(credential, password);
    }

    @PostMapping("/users")
    @ResponseBody
    public BerryPerson register
            (@RequestParam(name="rightId") String rightId,
             @RequestParam(name="email") String email,
             @RequestParam(name="username") String username,
             @RequestParam(name="password") String password,
             @RequestParam(name="name") String name,
             @RequestParam(name="surname") String surname,
             @RequestParam(name="sex") String sex,
             @RequestParam(name="dateOfBirth") String dateOfBirth,
             @RequestParam(name="telegram") String telegram,
             @RequestParam(name="vk") String vk){
        int right = Integer.parseInt(rightId);
        LocalDate date = LocalDate.parse(dateOfBirth);
        Sex gender = Sex.valueOf(sex);
        String telegram1 = telegram.equals("") ? null : telegram;
        String vk1 = vk.equals("") ? null:vk;
        return service.register(right, email, username, password, name, surname, gender, date, telegram1, vk1);
    }
}
