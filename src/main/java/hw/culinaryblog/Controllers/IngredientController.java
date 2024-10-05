package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.Ingredient.Ingredient;
import hw.culinaryblog.Models.Ingredient.IngredientCreateDTO;
import hw.culinaryblog.Models.Ingredient.IngredientUpdateDTO;
import hw.culinaryblog.Repo.IngredientRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/api/ingredients", produces = { "application/json" })
@Tag(name="Ingredients")
@SecurityRequirement(name = "Bearer Authentication")
public class IngredientController {
    private final IngredientRepository ingredientRepository;

    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Operation(
            summary = "Получение всех ингредиентов"
    )
    @GetMapping
    public Iterable<Ingredient> getIngredients() {
        return ingredientRepository.findAll();
    }

    @Operation(
            summary = "Получение ингредиента по идентификатору"
    )
    @GetMapping("/{id}")
    public Ingredient getIngredient(@PathVariable Long id) {
        return ingredientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Operation(
            summary = "Добавление ингредиента"
    )
    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(@RequestBody IngredientCreateDTO dto) throws URISyntaxException {
        Ingredient savedIngredient = ingredientRepository.save(dto.convertToIngredient());
        return ResponseEntity.created(new URI("/api/ingredients/" + savedIngredient.getId())).body(savedIngredient);
    }

    @Operation(
            summary = "Изменение ингредиента"
    )
    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable Long id, @RequestBody IngredientUpdateDTO dto) {
        if(ingredientRepository.existsById(id)) {
            Ingredient currentIngredient = ingredientRepository.findById(id).orElseThrow(RuntimeException::new);
            currentIngredient.setName(dto.getName());
            currentIngredient.setDescription(dto.getDescription());
            ingredientRepository.save(currentIngredient);
            return ResponseEntity.ok(currentIngredient);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Удаление ингредиента"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Ingredient> deleteIngredient(@PathVariable Long id) {
        ingredientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
