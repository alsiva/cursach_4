package backend.yagodnoye.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String sex;
    private String dateOfBirth;

    private String telegram;
    private String vk;

}
