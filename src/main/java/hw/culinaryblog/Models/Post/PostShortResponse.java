package hw.culinaryblog.Models.Post;

import lombok.Data;

@Data
public class PostShortResponse {
    private Long id;
    private String title;
    private Boolean isEnabled;

    public PostShortResponse(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.isEnabled = post.getIsEnabled();
    }
}
