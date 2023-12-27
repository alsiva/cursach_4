package backend.yagodnoye.Services;

import backend.yagodnoye.Exceptions.RegisterException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Services.validators.PersonValidator;
import backend.yagodnoye.authentication.AuthenticationResponse;
import backend.yagodnoye.authentication.LoginRequest;
import backend.yagodnoye.authentication.RegisterRequest;
import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Gender;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Repository.BerryPersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BerryPersonService {
    private final BerryPersonRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuthenticationManager manager;
    private final PersonValidator validator;

    public BerryPerson findByName(String name) throws PersonNotFoundException, WrongParametersException {
        if (!validator.isName(name)) throw new WrongParametersException("Wrong name pattern");
        Optional<BerryPerson> berryPersonOptional = repository.findFirstByNameIgnoreCaseOrderBySurnameAsc(name);
        if(berryPersonOptional.isEmpty()) throw new PersonNotFoundException("Berry person with name " + name + " was not found");
        return berryPersonOptional.get();
    }
    public BerryPerson findByUsername (String username) throws PersonNotFoundException, WrongParametersException {
        if (!validator.isUsername(username)) throw new WrongParametersException("Wrong username pattern");
        Optional<BerryPerson> berryPersonOptional = repository.findByUsernameLikeIgnoreCase(username);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException("Berry person with username " + username + " was not found");
        return berryPersonOptional.get();
    }

    public BerryPerson findByEmail (String email) throws PersonNotFoundException, WrongParametersException {
        if (!validator.isEmail(email)) throw new WrongParametersException("Wrong email pattern");
        Optional<BerryPerson> berryPersonOptional = repository.findByEmailLikeAllIgnoreCase(email);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException("Berry person with email " + email + " was not found");
        return berryPersonOptional.get();
    }

    public BerryPerson findByCredential(String credential) throws PersonNotFoundException, WrongParametersException {
        if (validator.isEmail(credential)) {
            return findByEmail(credential);
        }
        return findByUsername(credential);
    }


    public BerryPerson findById(Long id) throws PersonNotFoundException, WrongParametersException {
        if (!validator.validateId(id)) throw new WrongParametersException("Person id cannot be less than 0");
        Optional<BerryPerson> berryPersonOptional = repository.findByIdEquals(id);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException(("Berry person with id=" + id + " was not found"));
        return berryPersonOptional.get();
    }

    public AuthenticationResponse register(RegisterRequest request) throws RegisterException, WrongParametersException {
        if (request.getTelegram().isEmpty()) request.setTelegram(null);
        if (request.getVk().isEmpty()) request.setTelegram(null);
        validator.validateRegisterRequest(request);
        if (repository.existsByEmailEqualsIgnoreCase(request.getEmail())) throw new RegisterException("Person with email " + request.getEmail() + " is already exists");
        if (repository.existsByUsernameEqualsIgnoreCase(request.getUsername())) throw new RegisterException("Person with username " + request.getUsername() + " already exists");
        BerryPerson berryPerson = new BerryPerson(
                request.getEmail(),
                request.getUsername(),
                encoder.encode(request.getPassword()),
                request.getName(),
                request.getSurname(),
                Gender.valueOf(request.getSex()),
                LocalDate.parse(request.getDateOfBirth()),
                request.getTelegram(),
                request.getVk()
        );
        repository.save(berryPerson);
        var jwtToken = jwtService.generateToken(berryPerson);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse login(LoginRequest request) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getCredential(),
                    request.getPassword()
                )
        );
        BerryPerson user;
        if (validator.isEmail(request.getCredential())){
            user = repository.findByEmailLikeAllIgnoreCase(request.getCredential()).orElseThrow();
        }
        else{
            user = repository.findByUsernameLikeIgnoreCase(request.getCredential()).orElseThrow();
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
