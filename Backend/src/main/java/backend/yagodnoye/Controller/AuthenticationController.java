package backend.yagodnoye.Controller;

import backend.yagodnoye.Services.BerryPersonService;
import backend.yagodnoye.authentication.AuthenticationResponse;
import backend.yagodnoye.authentication.LoginRequest;
import backend.yagodnoye.authentication.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private BerryPersonService service;

    @Autowired
    public AuthenticationController(BerryPersonService service){
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginRequest request
    ){
        return ResponseEntity.ok(service.login(request));
    }

    public void setService(BerryPersonService service) {
        this.service = service;
    }
}
