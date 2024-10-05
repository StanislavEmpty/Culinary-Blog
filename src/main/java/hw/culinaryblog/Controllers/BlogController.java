package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.Blog.Blog;
import hw.culinaryblog.Models.Blog.BlogCreateDTO;
import hw.culinaryblog.Models.Blog.BlogUpdateDTO;
import hw.culinaryblog.Repo.BlogRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/api/blogs", produces = { "application/json" })
@Tag(name = "Blogs")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class BlogController {

    private final BlogRepository blogRepository;

    @Operation(
            summary = "Получение всех блогов"
    )
    @GetMapping
    public Iterable<Blog> getBlogs() {
        return blogRepository.findAll();
    }

    @Operation(
            summary = "Получение блога по идентификатору"
    )
    @GetMapping("/{id}")
    public Blog getBlog(@PathVariable Long id) {
        return blogRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Operation(
            summary = "Добавление блога"
    )
    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody BlogCreateDTO dto) throws URISyntaxException {
        Blog savedBlog = blogRepository.save(dto.convertToBlog());
        return ResponseEntity.created(new URI("/api/blogs/" + savedBlog.getId())).body(savedBlog);
    }

    @Operation(
            summary = "Изменение блога"
    )
    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody BlogUpdateDTO dto) {
        if (blogRepository.existsById(id)) {
            Blog currentBlog = blogRepository.findById(id).orElseThrow(RuntimeException::new);
            currentBlog.setTitle(dto.getTitle());
            currentBlog.setPosts(dto.getPosts());
            blogRepository.save(currentBlog);
            return ResponseEntity.ok(currentBlog);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Удаление блога"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Blog> deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
