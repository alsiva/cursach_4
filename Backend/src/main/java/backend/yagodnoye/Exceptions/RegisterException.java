package backend.yagodnoye.Exceptions;

public class RegisterException extends Exception{
    public RegisterException(String message){
        System.err.println(message + " already taken!");
    }
}
