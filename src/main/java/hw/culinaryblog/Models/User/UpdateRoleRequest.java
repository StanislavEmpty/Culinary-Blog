package hw.culinaryblog.Models.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
@Schema(description = "Запрос на обновление роли")
public class UpdateRoleRequest {
    @Enumerated(EnumType.STRING)
    Role role;
}
