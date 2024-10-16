package hw.culinaryblog.Repo;

import hw.culinaryblog.Models.Post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Iterable<Post> findAllByOrderByLikesDesc();
    Iterable<Post> findByTitleContainsIgnoreCase(String title);
    Iterable<Post> findByDurationCookingMinutes(int durationCookingMinutes);
}
