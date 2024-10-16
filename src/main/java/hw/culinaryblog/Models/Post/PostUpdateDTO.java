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
public class PostUpdateDTO {
    private Long id;
    private String title;
    private String imageUrl;
    private int durationCookingMinutes;
    private Collection<Stage> stages;
    private Collection<Ingredient> ingredients;

    public Post updatePost(Post post) {
        post.setTitle(title);
        post.setImageUrl(imageUrl);
        post.setDurationCookingMinutes(durationCookingMinutes);
        post.setStages(stages);
        post.setIngredients(ingredients);
        return post;
    }
}
