package hw.culinaryblog.Services;

import hw.culinaryblog.Models.Comment.Comment;
import hw.culinaryblog.Models.Comment.CommentResponse;
import hw.culinaryblog.Models.Post.Post;
import hw.culinaryblog.Models.Post.PostResponse;
import hw.culinaryblog.Models.Post.PostShortResponse;
import hw.culinaryblog.Models.Post.PostUpdateDTO;
import hw.culinaryblog.Repo.CommentRepository;
import hw.culinaryblog.Repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository repository;
    private final UserService userService;
    private final CommentRepository commentRepository;

    public PostResponse save(Post post) {
        Post createdPost = repository.save(post);
        return new PostResponse(createdPost);
    }

    public PostResponse update(PostUpdateDTO dto) {
        Post currentPost = repository.findById(dto.getId()).orElse(null);
        if (currentPost == null) {
            return null;
        }
        currentPost = dto.updatePost(currentPost);
        currentPost = repository.save(currentPost);
        return new PostResponse(currentPost);
    }

    public void like(Long postId) {
        Post currentPost = repository.findById(postId).orElse(null);
        if (currentPost == null) {
            return;
        }
        currentPost.setLikes(currentPost.getLikes() + 1);
        repository.save(currentPost);
    }

    public void dislike(Long postId) {
        Post currentPost = repository.findById(postId).orElse(null);
        if (currentPost == null) {
            return;
        }
        currentPost.setDislikes(currentPost.getDislikes() + 1);
        repository.save(currentPost);
    }

    public CommentResponse addComment(Long postId, Comment comment) {
        Post currentPost = repository.findById(postId).orElse(null);
        if (currentPost == null) {
            return null;
        }
        comment.setAuthor(userService.getCurrentUser());
        commentRepository.save(comment);
        currentPost.getComments().add(comment);
        repository.save(currentPost);
        return new CommentResponse(comment);
    }

    public CommentResponse editComment(Long commentId, String content) {
        Comment currentComment = commentRepository.findById(commentId).orElse(null);
        if (currentComment == null) {
            return null;
        }
        currentComment.setContent(content);
        commentRepository.save(currentComment);
        return new CommentResponse(currentComment);
    }

    public Boolean deleteComment(Long postId, Long commentId) {
        Comment currentComment = commentRepository.findById(commentId).orElse(null);
        if (currentComment == null) {
            return false;
        }
        Post currentPost = repository.findById(postId).orElse(null);
        if (currentPost == null) {
            return false;
        }
        currentPost.getComments().remove(currentComment);
        repository.save(currentPost);
        commentRepository.delete(currentComment);
        return true;
    }

    public Iterable<PostShortResponse> findAll() {
        List<PostShortResponse> postResponses = new ArrayList<>();
        for (Post post : repository.findAll()) {
            postResponses.add(new PostShortResponse(post));
        }
        return postResponses;
    }

    public Iterable<PostShortResponse> findMyPosts() {
        List<PostShortResponse> postResponses = new ArrayList<>();
        for (Post post : repository.findAllByAuthor(userService.getCurrentUser())) {
            postResponses.add(new PostShortResponse(post));
        }
        return postResponses;
    }

    public PostResponse findById(Long id) {
        Post post = repository.findById(id).orElse(null);
        if (post == null || !post.getIsEnabled()) {
            return null;
        }
        return new PostResponse(post);
    }

    public Iterable<PostResponse> findPopular() {
        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : repository.findAllByIsEnabledIsTrueOrderByLikesDesc()) {
            postResponses.add(new PostResponse(post));
        }
        return postResponses;
    }

    public Iterable<PostResponse> findByTitle(String title) {
        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : repository.findAllByIsEnabledIsTrueAndTitleContainsIgnoreCase(title)) {
            postResponses.add(new PostResponse(post));
        }
        return postResponses;
    }

    public Iterable<PostResponse> findByDuration(int duration) {
        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : repository.findAllByIsEnabledIsTrueAndDurationCookingMinutes(duration)) {
            postResponses.add(new PostResponse(post));
        }
        return postResponses;
    }

    public Boolean banById(Long postId) {
        Post currentPost = repository.findById(postId).orElse(null);
        if (currentPost == null) {
            return false;
        }
        currentPost.setIsEnabled(false);
        repository.save(currentPost);
        return true;
    }

    public Boolean unbanById(Long postId) {
        Post currentPost = repository.findById(postId).orElse(null);
        if (currentPost == null) {
            return false;
        }
        currentPost.setIsEnabled(true);
        repository.save(currentPost);
        return true;
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
