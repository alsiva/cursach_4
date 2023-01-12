package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Exceptions.HouseNotFoundException;
import backend.yagodnoye.Repository.HouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseService {
    private HouseRepository repository;

    public HouseService(HouseRepository repository){
        this.repository = repository;
    }

    public House getHouseByID(Long id) throws HouseNotFoundException {
        Optional<House> houseOptional = repository.findByIdEquals(id);
        if(houseOptional.isEmpty()) throw new HouseNotFoundException("House with id=" + id + " not found!");
        return houseOptional.get();
    }

    public List<House> getAllHouses() {
        return repository.findAll();
    }
}
