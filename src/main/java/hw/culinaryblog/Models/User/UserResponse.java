package hw.culinaryblog.Models.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Schema(description = "Ответ по данным пользователя")
@AllArgsConstructor
public class UserResponse {
    private Long id;

    private String username;

    private String email;

    private String avatarUrl;

    private String bio;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean isEnabled;
}
