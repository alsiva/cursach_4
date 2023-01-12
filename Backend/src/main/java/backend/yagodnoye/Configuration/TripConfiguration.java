//package backend.yagodnoye.Configuration;
//
//import backend.yagodnoye.Entities.Trip;
//import backend.yagodnoye.Repository.TripRepository;
//import backend.yagodnoye.Services.BerryPersonService;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Configuration
//public class TripConfiguration {
//    @Bean
//    CommandLineRunner commandLine(BerryPersonService service, TripRepository tripRepository){
//        return args -> {
//            Trip halloween = new Trip(
//                    "Halloween 2022",
//                    "Itmo party of haloween in Yagodnoye",
//                    LocalDate.of(2022,10,29),
//                    LocalDate.of(2022,11,1),
//                    service.findByName("Bilguun")
//            );
//            Trip newYear = new Trip(
//                    "New Year 2023",
//                    "ITMO party and new years eve of 2023",
//                    LocalDate.of(2022,12,31),
//                    LocalDate.of(2023,1,2),
//                    service.findByName("Chintsovoo")
//            );
//            tripRepository.saveAll(List.of(halloween, newYear));
//        };
//    }
//}
