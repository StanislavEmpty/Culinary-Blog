package hw.culinaryblog.Models.Comment;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentResponse {
    private long id;
    private String author;
    private String content;
    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date date;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.author = comment.getAuthor().getUsername();
        this.content = comment.getContent();
        this.date = comment.getDate();
    }
}
