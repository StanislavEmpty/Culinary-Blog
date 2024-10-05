package hw.culinaryblog.Models.Ingredient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class IngredientUpdateDTO {
    private Long id;
    private String name;
    private String description;

    public Ingredient convertToIngredient() {
        Ingredient ingredient = new Ingredient();
        ingredient.setId(this.id);
        ingredient.setName(this.name);
        ingredient.setDescription(this.description);
        return ingredient;
    }
}
