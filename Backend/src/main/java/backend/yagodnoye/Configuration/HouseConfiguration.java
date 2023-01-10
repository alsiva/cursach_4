package backend.yagodnoye.Configuration;

import backend.yagodnoye.Entities.House;
import backend.yagodnoye.Repository.HouseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class HouseConfiguration {
    @Bean
    CommandLineRunner c(HouseRepository repository){
        return args -> {
            House house1 = new House("Yellow house", 2);
            House house2 = new House("Red house", 3);
            House house3 = new House("Blue house", 5);
            repository.saveAll(List.of(house1,house2, house3));
        };
    }

}
