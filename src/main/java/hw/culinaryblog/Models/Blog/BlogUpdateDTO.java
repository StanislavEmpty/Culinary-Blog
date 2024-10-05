package hw.culinaryblog.Models.Blog;

import hw.culinaryblog.Models.Post.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogUpdateDTO {
    private Long id;
    private String title;
    private Collection<Post> posts;

    // Convert DTO to Blog entity
    public Blog convertToBlog() {
        Blog blog = new Blog();
        blog.setId(this.id);
        blog.setTitle(this.title);
        blog.setPosts(this.posts);
        return blog;
    }
}
