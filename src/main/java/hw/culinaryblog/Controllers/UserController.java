package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.User.User;
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
    public Iterable<User> getUsers() {
        return userService.findAll();
    }

    @Operation(
            summary = "Получение пользователя по идентификатору"
    )
    @GetMapping("/{id}")
    public User getUserByUserId(@PathVariable Long id) {
        return userService.findById(id);
    }

    @Operation(
            summary = "Получение текущего пользователя"
    )
    @GetMapping("/get-current-user")
    public UserUpdateDTO getUserByUserName() {
        User currentUser = userService.getCurrentUser();
        return new UserUpdateDTO(
            currentUser.getId(),
            currentUser.getUsername(),
            currentUser.getEmail(),
            currentUser.getAvatarUrl(),
            currentUser.getBio()
        );
    }

    @Operation(
            summary = "Изменение пользователя"
    )
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
        if (userService.existsById(id)) {
            User currentUser = userService.findById(id);
            currentUser.setUsername(dto.getUsername());
            currentUser.setEmail(dto.getEmail());
            currentUser.setAvatarUrl(dto.getAvatarUrl());
            currentUser.setBio(dto.getBio());
            userService.save(currentUser);
            return ResponseEntity.ok(currentUser);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Бан пользователя"
    )
    @PostMapping("/ban/{id}")
    public HttpStatus banUser(@PathVariable Long id) {
        if(userService.banById(id))
            return HttpStatus.OK;
        return HttpStatus.NOT_FOUND;
    }

    @Operation(
            summary = "Анбан пользователя"
    )
    @PostMapping("/unban/{id}")
    public HttpStatus unbanUser(@PathVariable Long id) {
        if(userService.unbanById(id))
            return HttpStatus.OK;
        return HttpStatus.NOT_FOUND;
    }

    @Operation(
            summary = "Удаление пользователя"
    )
    @DeleteMapping("/{id}")
    public HttpStatus deleteUser(@PathVariable Long id) {
        if(userService.deleteById(id))
            return HttpStatus.OK;
        return HttpStatus.NOT_FOUND;
    }
}
