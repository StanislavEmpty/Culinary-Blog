package hw.culinaryblog.Controllers;

import hw.culinaryblog.Models.Comment.Comment;
import hw.culinaryblog.Models.Comment.CommentResponse;
import hw.culinaryblog.Models.Post.Post;
import hw.culinaryblog.Models.Post.PostCreateDTO;
import hw.culinaryblog.Models.Post.PostResponse;
import hw.culinaryblog.Models.Post.PostUpdateDTO;
import hw.culinaryblog.Services.PostService;
import hw.culinaryblog.Services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpResponse;
import java.util.ArrayList;

@RestController
@RequestMapping(value = "/api/posts", produces = { "application/json" })
@Tag(name="Посты")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final UserService userService;

    @Operation(
            summary = "Получение всех постов"
    )
    @GetMapping
    public Iterable<PostResponse> getPosts() {
        return postService.findAll();
    }

    @Operation(
            summary = "Получение всех популярных постов"
    )
    @GetMapping("/popular")
    public Iterable<PostResponse> getPopularPosts() {
        return postService.findPopular();
    }

    @Operation(
            summary = "Получение постов пользователя"
    )
    @GetMapping("/my")
    public Iterable<PostResponse> getMyPosts() {
        return postService.findMyPosts();
    }

    @Operation(
            summary = "Получение постов по части названия"
    )
    @GetMapping("/search-by-title/{title}")
    public Iterable<PostResponse> getPostsByTitle(@PathVariable String title) {
        return postService.findByTitle(title);
    }

    @Operation(
            summary = "Получение постов по длительности"
    )
    @GetMapping("/search-by-duration/{duration}")
    public Iterable<PostResponse> getPostsByTitle(@PathVariable int duration) {
        return postService.findByDuration(duration);
    }

    @Operation(
            summary = "Добавление комментария для поста"
    )
    @PostMapping("/comment-new/{postId}")
    public ResponseEntity<CommentResponse> addCommentToPost(@PathVariable Long postId, @ModelAttribute Comment comment) {
        CommentResponse savedComment = postService.addComment(postId, comment);
        if (savedComment == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Entity not found"
            );
        }
        return ResponseEntity.ok().body(savedComment);
    }

    @Operation(
            summary = "Изменение комментария для поста"
    )
    @PutMapping("/comment-edit/{commentId}")
    public ResponseEntity<CommentResponse> editComment(@PathVariable Long commentId, @RequestBody String content) {
        CommentResponse result = postService.editComment(commentId, content);
        if (result == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Entity not found"
            );
        }
        return ResponseEntity.ok().body(result);
    }

    @Operation(
            summary = "Удаление комментария для поста"
    )
    @DeleteMapping("/{postId}/comment-delete/{commentId}")
    @ResponseStatus( HttpStatus.OK )
    public void deleteCommentFromPost(@PathVariable Long postId, @PathVariable Long commentId) {
        if (!postService.deleteComment(postId, commentId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Entity not found"
            );
        }
    }

    @Operation(
            summary = "Добавление лайка для поста"
    )
    @GetMapping("/like/{id}")
    public ResponseEntity<Post> likePost(@PathVariable Long id) {
        postService.like(id);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Добавление дизлайка для поста"
    )
    @GetMapping("/dislike/{id}")
    public ResponseEntity<Post> dislikePost(@PathVariable Long id) {
        postService.dislike(id);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Получение поста по идентификатору"
    )
    @GetMapping("/{id}")
    public PostResponse getPost(@PathVariable Long id) {
        return postService.findById(id);
    }

    @Operation(
            summary = "Добавление поста"
    )
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostCreateDTO dto) throws URISyntaxException {
        Post newPost = dto.convertToPost();
        newPost.setAuthor(userService.getCurrentUser());
        newPost.setComments(new ArrayList<>());
        PostResponse savedPostDTO = postService.save(newPost);
        return ResponseEntity.created(new URI("/api/posts/" + savedPostDTO.getId())).body(savedPostDTO);
    }

    @Operation(
            summary = "Бан поста"
    )
    @PostMapping("/ban/{id}")
    public HttpStatus banPost(@PathVariable Long id) {
        if (!postService.banById(id))
        {
            return HttpStatus.NOT_FOUND;
        }
        return HttpStatus.OK;
    }

    @Operation(
            summary = "Анбан поста"
    )
    @PostMapping("/unban/{id}")
    public HttpStatus unbanPost(@PathVariable Long id) {
        if (!postService.unbanById(id))
        {
            return HttpStatus.NOT_FOUND;
        }
        return HttpStatus.OK;
    }

    @Operation(
            summary = "Изменение поста"
    )
    @PutMapping()
    public ResponseEntity<PostResponse> updatePost(@RequestBody PostUpdateDTO dto) {
        if(postService.existsById(dto.getId())) {
            PostResponse postResponse = postService.update(dto);
            return ResponseEntity.ok(postResponse);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Удаление поста"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Post> deletePost(@PathVariable Long id) {
        postService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
