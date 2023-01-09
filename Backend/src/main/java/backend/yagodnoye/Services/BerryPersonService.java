package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.BerryPerson;
import backend.yagodnoye.Entities.Sex;
import backend.yagodnoye.Exceptions.RegisterException;
import backend.yagodnoye.Exceptions.PersonNotFoundException;
import backend.yagodnoye.Repository.BerryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class BerryPersonService {
    private final BerryPersonRepository repository;
    @Autowired
    public BerryPersonService(BerryPersonRepository repository){
        this.repository = repository;
    }
    public BerryPerson loginByUsername(String username, String password) throws PersonNotFoundException {
        Optional<BerryPerson> berryPersonOptional = repository.findByUsernameLikeIgnoreCaseAndPasswordLike(username, password);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException();
        return berryPersonOptional.get();
    }
    public BerryPerson loginByEmail(String email, String password) throws PersonNotFoundException {
        Optional<BerryPerson> berryPersonOptional = repository.findByEmailLikeIgnoreCaseAndPasswordLike(email, password);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException();
        return berryPersonOptional.get();
    }

    public BerryPerson register(int rightId, String email, String username, String password, String name, String surname, Sex sex, LocalDate dateOfBirth, String telegram, String vk) throws RegisterException {
        Optional<BerryPerson> berryPersonOptional = repository.findByUsernameLikeIgnoreCase(username);
        if(berryPersonOptional.isPresent()) throw new RegisterException("Username");
        berryPersonOptional = repository.findByEmailLikeIgnoreCase(email);
        if(berryPersonOptional.isPresent()) throw new RegisterException("Email ");
        BerryPerson berryPerson = new BerryPerson(rightId, email, username, password, name, surname, sex, dateOfBirth, telegram, vk);
        repository.save(berryPerson);
        return berryPerson;
    }

    public BerryPerson findByName(String name) throws PersonNotFoundException {
        Optional<BerryPerson> berryPersonOptional = repository.findFirstByNameIgnoreCaseOrderBySurnameAsc(name);
        if(berryPersonOptional.isEmpty()) throw new PersonNotFoundException();
        return berryPersonOptional.get();
    }
    public BerryPerson findByUsername (String username) throws PersonNotFoundException {
        Optional<BerryPerson> berryPersonOptional = repository.findByUsernameLikeIgnoreCase(username);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException();
        return berryPersonOptional.get();
    }
    public BerryPerson findById(Long id) throws PersonNotFoundException {
        Optional<BerryPerson> berryPersonOptional = repository.findByIdEquals(id);
        if (berryPersonOptional.isEmpty()) throw new PersonNotFoundException();
        return berryPersonOptional.get();
    }
}
