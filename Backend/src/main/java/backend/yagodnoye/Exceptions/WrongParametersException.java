package backend.yagodnoye.Exceptions;

public class WrongParametersException extends Exception{

    public WrongParametersException(String parameters){
        System.err.println("Wrong parameters: " + parameters);
    }
}
