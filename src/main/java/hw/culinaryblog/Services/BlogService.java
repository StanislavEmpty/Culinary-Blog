package hw.culinaryblog.Services;

import hw.culinaryblog.Models.Blog.Blog;
import hw.culinaryblog.Repo.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public Blog save(Blog blog) {
        return blogRepository.save(blog);
    }

    public Blog findById(Long id) {
        return blogRepository.findByIdAndIsEnabledIsTrue(id);
    }

    public Iterable<Blog> findAll() {
        return blogRepository.findAllByIsEnabledIsTrue();
    }

    public Blog update(Blog blog) {
        return blogRepository.save(blog);
    }

    public Boolean deleteById(Long id) {
        Blog blog = blogRepository.findById(id).orElse(null);
        if (blog != null) {
            blogRepository.delete(blog);
            return true;
        }
        return false;
    }

    public Boolean banById(Long id) {
        Blog blog = blogRepository.findById(id).orElse(null);
        if (blog != null) {
            blog.setIsEnabled(false);
            return true;
        }
        return false;
    }

    public Boolean unbanById(Long id) {
        Blog blog = blogRepository.findById(id).orElse(null);
        if (blog != null) {
            blog.setIsEnabled(true);
            return true;
        }
        return false;
    }

    public Boolean existsById(Long id) {
        return blogRepository.existsById(id);
    }
}
