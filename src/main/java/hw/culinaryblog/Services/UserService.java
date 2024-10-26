package hw.culinaryblog.Services;

import hw.culinaryblog.Models.User.*;
import hw.culinaryblog.Repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    /**
     * Сохранение пользователя
     *
     * @return сохраненный пользователь
     */
    public User save(User user) {
        return repository.save(user);
    }

    public Iterable<UserResponse> findAll() {
        List<UserResponse> responses = new ArrayList<>();
        for (User user : repository.findAll()) {
            responses.add(new UserResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getAvatarUrl(),
                    user.getBio(),
                    user.getRole(),
                    user.isEnabled()
            ));
        }
        return responses;
    }

    /**
     * Создание пользователя
     *
     * @return созданный пользователь
     */
    public User create(User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Пользователь с таким именем уже существует");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }

        return save(user);
    }

    /**
     * Получение пользователя по имени пользователя
     *
     * @return пользователь
     */
    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    /**
     * Получение пользователя по имени пользователя
     * <p>
     * Нужен для Spring Security
     *
     * @return пользователь
     */
    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    /**
     * Получение текущего пользователя
     *
     * @return текущий пользователь
     */
    public User getCurrentUser() {
        // Получение имени пользователя из контекста Spring Security
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }

    /**
     * Проверка существуют ли пользователи в базе
     *
     * @return Истина, если существуют, иначе ложь
     */
    public boolean isUsersEmpty() {
        return repository.count() == 0;
    }

    /**
     * Получить пользователя по ID
     *
     * @return пользователь
     */
    public UserResponse findById(Long id) {
        User user = repository.getReferenceById(id);
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getAvatarUrl(),
                user.getBio(),
                user.getRole(),
                user.isEnabled()
        );
    }

    /**
     * Получить данные пользователя по ID
     *
     * @return пользователь
     */
    public User getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    /**
     * Выдача прав администратора пользователю
     * <p>
     */
    public void setAdminById(Long id) {
        User user = repository.findById(id).orElse(null);
        if (user == null) {
            return;
        }
        user.setRole(Role.ROLE_ADMIN);
        save(user);
    }

    public void updateById(Long id, UserUpdateDTO dto) {
        User user = repository.findById(id).orElse(null);
        if (user == null) {
            return;
        }
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setAvatarUrl(dto.getAvatarUrl());
        user.setBio(dto.getBio());
        repository.save(user);
    }

    public void updateRole(Long id, UpdateRoleRequest roleRequest) {
        User user = repository.findById(id).orElse(null);
        if (user == null) {
            return;
        }
        user.setRole(roleRequest.getRole());
        save(user);
    }

    public Boolean deleteById(Long id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean banById(Long id) {
        User user = repository.findById(id).orElse(null);
        if (user == null) {
            return false;
        }
        user.setIsEnabled(false);
        save(user);
        return true;
    }

    public boolean unbanById(Long id) {
        User user = repository.findById(id).orElse(null);
        if (user == null) {
            return false;
        }
        user.setIsEnabled(true);
        save(user);
        return true;
    }
}
