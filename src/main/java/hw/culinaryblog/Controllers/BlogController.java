package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.Blog.Blog;
import hw.culinaryblog.Models.Blog.BlogCreateDTO;
import hw.culinaryblog.Models.Blog.BlogUpdateDTO;
import hw.culinaryblog.Services.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/api/blogs", produces = { "application/json" })
@Tag(name = "Blogs")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @Operation(
            summary = "Получение всех блогов"
    )
    @GetMapping
    public Iterable<Blog> getBlogs() {
        return blogService.findAll();
    }

    @Operation(
            summary = "Получение блога по идентификатору"
    )
    @GetMapping("/{id}")
    public Blog getBlog(@PathVariable Long id) {
        return blogService.findById(id);
    }

    @Operation(
            summary = "Добавление блога"
    )
    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody BlogCreateDTO dto) throws URISyntaxException {
        Blog savedBlog = blogService.save(dto.convertToBlog());
        return ResponseEntity.created(new URI("/api/blogs/" + savedBlog.getId())).body(savedBlog);
    }

    @Operation(
            summary = "Изменение блога"
    )
    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody BlogUpdateDTO dto) {
        if (blogService.existsById(id)) {
            Blog currentBlog = blogService.findById(id);
            currentBlog.setTitle(dto.getTitle());
            currentBlog.setPosts(dto.getPosts());
            blogService.save(currentBlog);
            return ResponseEntity.ok(currentBlog);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Бан блога"
    )
    @PostMapping("/ban/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public HttpStatus banBlog(@PathVariable Long id) {
        if(blogService.banById(id))
            return HttpStatus.OK;
        return HttpStatus.NOT_FOUND;
    }

    @Operation(
            summary = "Анбан блога"
    )
    @PostMapping("/unban/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public HttpStatus unbanBlog(@PathVariable Long id) {
        if(blogService.unbanById(id))
            return HttpStatus.OK;
        return HttpStatus.NOT_FOUND;
    }

    @Operation(
            summary = "Удаление блога"
    )
    @DeleteMapping("/{id}")
    public HttpStatus deleteBlog(@PathVariable Long id) {
        if(blogService.deleteById(id))
            return HttpStatus.OK;
        return HttpStatus.NOT_FOUND;
    }
}
