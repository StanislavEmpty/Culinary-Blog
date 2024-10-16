package hw.culinaryblog.Models.Comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hw.culinaryblog.Models.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "author_id")
    @JsonIgnore
    private User author;
    private String content;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date date;
}
