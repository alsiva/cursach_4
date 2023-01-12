//package backend.yagodnoye.Configuration;
//
//import backend.yagodnoye.Entities.BerryPerson;
//import backend.yagodnoye.Entities.Sex;
//import backend.yagodnoye.Repository.BerryPersonRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Configuration
//public class BerryPersonConfiguration {
//
//    @Bean
//    CommandLineRunner commandLineRunner(BerryPersonRepository repository){
//        return args -> {
//            BerryPerson Bilguun = new BerryPerson(3,
//                    "bilguuk124@gmail.com",
//                    "bilguuk124",
//                    "Gungun124",
//                    "Bilguun",
//                    "Purevsuren",
//                    Sex.man,
//                    LocalDate.of(2002,10,25),
//                    null,
//                    null);
//
//            BerryPerson Tsovoo = new BerryPerson(1,
//                    "tsovoon01@gmail.com",
//                    "Tsovoo123",
//                    "Tsovoo01",
//                    "Chintsovoo",
//                    "Sukhbaatar",
//                    Sex.woman,
//                    LocalDate.of(2003,6,30),
//                    null,
//                    null);
//            repository.saveAll(List.of(Bilguun, Tsovoo));
//        };
//    }
//}
