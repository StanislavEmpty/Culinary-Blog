package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.User.UpdateRoleRequest;
import hw.culinaryblog.Models.User.User;
import hw.culinaryblog.Models.User.UserResponse;
import hw.culinaryblog.Models.User.UserUpdateDTO;
import hw.culinaryblog.Services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/users", produces = { "application/json" })
@Tag(name="Пользователи")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(
            summary = "Получение всех пользователей"
    )
    @GetMapping
    public Iterable<UserResponse> getUsers() {
        return userService.findAll();
    }

    @Operation(
            summary = "Получение пользователя по идентификатору"
    )
    @GetMapping("/{id}")
    public UserResponse getUserByUserId(@PathVariable Long id) {
        return userService.findById(id);
    }

    @Operation(
            summary = "Получение текущего пользователя"
    )
    @GetMapping("/get-current-user")
    public UserResponse getUserByUserName() {
        User currentUser = userService.getCurrentUser();
        return new UserResponse(
            currentUser.getId(),
            currentUser.getUsername(),
            currentUser.getEmail(),
            currentUser.getAvatarUrl(),
            currentUser.getBio(),
            currentUser.getRole(),
            currentUser.getIsEnabled()
        );
    }

    @Operation(
            summary = "Изменение пользователя"
    )
    @PutMapping("/{id}")
    public HttpStatus updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
        if (userService.existsById(id)) {
            userService.updateById(id, dto);
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @Operation(
            summary = "Установка роли пользователя"
    )
    @PostMapping("/set-role/{id}")
    public HttpStatus setRoleById(@PathVariable Long id, @RequestBody UpdateRoleRequest request) {
        if (userService.existsById(id)) {
            userService.updateRole(id, request);
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @Operation(
            summary = "Бан пользователя"
    )
    @PostMapping("/ban/{id}")
    public HttpStatus banUser(@PathVariable Long id) {
        if(userService.banById(id))
            return HttpStatus.OK;
        return HttpStatus.BAD_REQUEST;
    }

    @Operation(
            summary = "Анбан пользователя"
    )
    @PostMapping("/unban/{id}")
    public HttpStatus unbanUser(@PathVariable Long id) {
        if(userService.unbanById(id))
            return HttpStatus.OK;
        return HttpStatus.BAD_REQUEST;
    }

    @Operation(
            summary = "Удаление пользователя"
    )
    @DeleteMapping("/{id}")
    public HttpStatus deleteUser(@PathVariable Long id) {
        if(userService.deleteById(id))
            return HttpStatus.OK;
        return HttpStatus.BAD_REQUEST;
    }
}
