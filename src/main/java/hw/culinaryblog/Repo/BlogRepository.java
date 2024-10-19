package hw.culinaryblog.Repo;

import hw.culinaryblog.Models.Blog.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Iterable<Blog> findAllByIsEnabledIsTrue();
    Blog findByIdAndIsEnabledIsTrue(long id);
}
