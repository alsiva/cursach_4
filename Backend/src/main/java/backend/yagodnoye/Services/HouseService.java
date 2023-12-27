package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Exceptions.AlreadyExistsException;
import backend.yagodnoye.Exceptions.HouseNotFoundException;
import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.Repository.HouseRepository;
import backend.yagodnoye.Services.validators.GenericValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HouseService {
    private final HouseRepository repository;
    private final GenericValidator validator;


    public House getHouseByID(Long id) throws HouseNotFoundException, WrongParametersException {
        validator.validateId(id);
        Optional<House> houseOptional = repository.findByIdEquals(id);
        if(houseOptional.isEmpty()) throw new HouseNotFoundException("House with id=" + id + " not found!");
        return houseOptional.get();
    }

    public List<House> getAllHouses() {
        return repository.findAll();
    }

    public House createHouse(String name, int maxPeople) throws AlreadyExistsException, WrongParametersException {
        validator.validateHouseParam(name, maxPeople);
        if (repository.existsByNameEqualsIgnoreCase(name)) throw new AlreadyExistsException("House with name " + name + " already exists");
        House house = new House(name, maxPeople);
        repository.save(house);
        return house;
    }
}
