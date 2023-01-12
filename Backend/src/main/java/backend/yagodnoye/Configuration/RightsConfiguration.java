package backend.yagodnoye.Configuration;

import backend.yagodnoye.Entities.Rights;
import backend.yagodnoye.Services.RightsService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class RightsConfiguration {

    @Bean
    public List<Rights> getRightsLists(RightsService service){
        return service.checkIfExists();
    }
}
