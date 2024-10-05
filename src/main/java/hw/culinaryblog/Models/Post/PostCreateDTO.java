package hw.culinaryblog.Models.Post;

import hw.culinaryblog.Models.Ingredient.Ingredient;
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
    private String content;
    private String author;
    private Collection<Ingredient> ingredients;

    public Post convertToPost() {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setAuthor(author);
        post.setIngredients(ingredients);
        return post;
    }
}
