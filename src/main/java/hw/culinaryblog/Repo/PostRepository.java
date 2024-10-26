package hw.culinaryblog.Repo;

import hw.culinaryblog.Models.Post.Post;
import hw.culinaryblog.Models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Iterable<Post> findAllByIsEnabledIsTrueOrderByLikesDesc();
    Iterable<Post> findAllByAuthor(User author);
    Iterable<Post> findAllByIsEnabledIsTrueAndTitleContainsIgnoreCase(String title);
    Iterable<Post> findAllByIsEnabledIsTrueAndDurationCookingMinutes(int durationCookingMinutes);
}
