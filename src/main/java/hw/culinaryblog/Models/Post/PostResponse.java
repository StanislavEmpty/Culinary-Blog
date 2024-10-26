package hw.culinaryblog.Models.Post;

import hw.culinaryblog.Models.Comment.Comment;
import hw.culinaryblog.Models.Comment.CommentResponse;
import hw.culinaryblog.Models.Ingredient.Ingredient;
import hw.culinaryblog.Models.Stage.Stage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostResponse {
    private Long id;

    private String title;

    private String imageUrl;

    private int durationCookingMinutes;

    private String author;

    private Long likes;

    private Long dislikes;

    private Collection<CommentResponse> comments;

    private Collection<Stage> stages;

    private Collection<Ingredient> ingredients;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.imageUrl = post.getImageUrl();
        this.author = post.getAuthor().getUsername();
        this.durationCookingMinutes = post.getDurationCookingMinutes();
        this.likes = post.getLikes();
        this.dislikes = post.getDislikes();

        comments = new ArrayList<>();
        for (Comment comment : post.getComments()) {
            comments.add(new CommentResponse(comment));
        }

        this.stages = post.getStages();
        this.ingredients = post.getIngredients();
    }
}
