package backend.yagodnoye.Services;

import backend.yagodnoye.Entities.Rights;
import backend.yagodnoye.Entities.RightsEnum;
import backend.yagodnoye.Repository.RightsRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RightsService {


    private final RightsRepository repository;

    public List<Rights> checkIfExists(){
        List<Rights> list = new ArrayList<>();
        for (RightsEnum rights : RightsEnum.values()){
            Optional<Rights> right = repository.findByNameEquals(rights);
            if (right.isEmpty()){
                Rights rightObj = repository.save(new Rights(rights.toString()));
                list.add(rightObj);
            }
            else{
                list.add(right.get());
            }
        }
        return list;
    }
}
