package hw.culinaryblog.Repo;

import hw.culinaryblog.Models.Comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
