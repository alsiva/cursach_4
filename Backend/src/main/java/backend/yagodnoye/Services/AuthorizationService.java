package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Sex;
import backend.yagodnoye.Repository.BerryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AuthorizationService {
    private final BerryPersonRepository repository;
    @Autowired
    public AuthorizationService(BerryPersonRepository repository){
        this.repository = repository;
    }
    public BerryPerson loginByUsername(String username, String password){
        return repository.findByUsernameLikeAndPasswordLike(username,password);
    }
    public BerryPerson loginByEmail(String email, String password){
        return repository.findByEmailLikeAndPasswordLike(email,password);
    }

    public BerryPerson register(int rightId, String email, String username, String password, String name, String surname, Sex sex, LocalDate dateOfBirth, String telegram, String vk){
        BerryPerson berryPerson = new BerryPerson(rightId, email, username, password, name, surname, sex, dateOfBirth, telegram, vk);
        repository.save(berryPerson);
        return berryPerson;
    }

    public BerryPerson findByName(String name){
        return repository.findByNameLikeIgnoreCase(name);
    }
    public BerryPerson findByUsername (String username) {return repository.findByUsernameLikeIgnoreCase
    (username);}
    public BerryPerson findById(Long id) {return repository.findByIdEquals(id);}
}
