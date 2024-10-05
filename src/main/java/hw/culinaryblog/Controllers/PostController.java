package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.Post.Post;
import hw.culinaryblog.Models.Post.PostCreateDTO;
import hw.culinaryblog.Models.Post.PostUpdateDTO;
import hw.culinaryblog.Repo.PostRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/api/posts", produces = { "application/json" })
@Tag(name="Posts")
@SecurityRequirement(name = "Bearer Authentication")
public class PostController {
    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Operation(
            summary = "Получение всех постов"
    )
    @GetMapping
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    @Operation(
            summary = "Получение поста по идентификатору"
    )
    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Operation(
            summary = "Добавление поста"
    )
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostCreateDTO dto) throws URISyntaxException {
        Post savedPost = postRepository.save(dto.convertToPost());
        return ResponseEntity.created(new URI("/api/posts/" + savedPost.getId())).body(savedPost);
    }

    @Operation(
            summary = "Изменение поста"
    )
    @PutMapping()
    public ResponseEntity<Post> updatePost(@RequestBody PostUpdateDTO dto) {
        if(postRepository.existsById(dto.getId())) {
            Post currentPost = postRepository.findById(dto.getId()).orElseThrow(RuntimeException::new);
            currentPost.setTitle(dto.getTitle());
            currentPost.setContent(dto.getContent());
            currentPost.setAuthor(dto.getAuthor());
            currentPost.setIngredients(dto.getIngredients());
            postRepository.save(currentPost);
            return ResponseEntity.ok(currentPost);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Удаление поста"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Post> deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
