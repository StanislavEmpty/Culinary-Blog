package hw.culinaryblog.Repo;

import hw.culinaryblog.Models.Ingredient.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
