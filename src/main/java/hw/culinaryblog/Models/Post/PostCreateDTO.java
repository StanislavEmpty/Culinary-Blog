package hw.culinaryblog.Models.Post;

import hw.culinaryblog.Models.Ingredient.Ingredient;
import hw.culinaryblog.Models.Stage.Stage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PostCreateDTO {
    private String title;
    private String imageUrl;
    private int durationCookingMinutes;
    private Collection<Stage> stages;
    private Collection<Ingredient> ingredients;

    public Post convertToPost() {
        Post post = new Post();
        post.setTitle(title);
        post.setDurationCookingMinutes(durationCookingMinutes);
        post.setIngredients(ingredients);
        post.setStages(stages);
        return post;
    }
}
