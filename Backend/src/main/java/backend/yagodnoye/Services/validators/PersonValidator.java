package backend.yagodnoye.Services.validators;

import backend.yagodnoye.Exceptions.WrongParametersException;
import backend.yagodnoye.authentication.RegisterRequest;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class PersonValidator {

    private static final String emailPattern = "^(.+)@(\\S+)$";
    private static final String telegramPattern = "^@[a-z0-9]+$";

    private static final String namePattern = "^([A-Za-z]+|[А-Яа-я]+)$";
    private static final String usernamePattern = "^[a-zA-Z0-9_]+$";

    public boolean isEmail(String email){
        return Pattern.compile(emailPattern).matcher(email).matches();
    }

    public boolean isTelegram(String telegram){
        return Pattern.compile(telegramPattern).matcher(telegram).matches();
    }

    public boolean isName(String name){
        return Pattern.compile(namePattern).matcher(name).matches();
    }

    public boolean isUsername(String username){
        return Pattern.compile(usernamePattern).matcher(username).matches();
    }

    public boolean validateId(Long id){
        return id > 0;
    }

    public void validateRegisterRequest(RegisterRequest request) throws WrongParametersException {
        if (!isEmail(request.getEmail())) throw new WrongParametersException("Wrong email pattern");
        if (!isUsername(request.getUsername())) throw new WrongParametersException("Wrong username pattern");
        if (!isName(request.getName())) throw new WrongParametersException("Wrong name pattern");
        if (!isName(request.getSurname())) throw new WrongParametersException("Wrong surname pattern");
        if (request.getTelegram() != null && !request.getTelegram().isEmpty() && !isTelegram(request.getTelegram())) throw new WrongParametersException("Wrong telegram pattern");
        if(request.getPassword().length() < 4) throw new WrongParametersException("Password must be longer than 4 letters");
    }
}
