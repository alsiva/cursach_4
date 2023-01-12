package backend.yagodnoye.Configuration;

import backend.yagodnoye.Services.RightsService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RightsConfiguration {

    @Bean
    public void commandLineRunner(RightsService service){
        service.checkIfExists();
    }
}
