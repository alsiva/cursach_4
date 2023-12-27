package backend.yagodnoye.Entities;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
public class ErrorBody {
    private int statusCode;
    private String message;
    private String details;
    private LocalDateTime timestamp;

}
