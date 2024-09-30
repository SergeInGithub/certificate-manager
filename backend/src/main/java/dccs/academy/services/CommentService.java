package dccs.academy.services;

import dccs.academy.dtos.CommentDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.CertificateRepository;
import dccs.academy.repositories.CommentRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.transfomers.CommentTransformer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CommentService {

    @Inject
    CommentRepository commentRepository;

    @Inject
    CommentTransformer commentTransformer;

    @Inject
    UserRepository userRepository;

    @Inject
    CertificateRepository certificateRepository;

    public List<CommentDto> getComments() {
        List<CommentEntity> commentEntities = commentRepository.listAll();
        return commentRepository.listAll().stream().map(commentTransformer::toDto).collect(Collectors.toList());
    }

    public CommentDto createComment(CommentDto commentDto) {
        UserEntity user = userRepository.findById(commentDto.getUserId());
        if(user == null) {
            throw new EntityNotFoundException("User with ID " + commentDto.getUserId() + " not found");
        }

        CertificateEntity certificate = certificateRepository.findById(commentDto.getCertificateId());
        if(certificate == null) {
            throw new EntityNotFoundException("Certificate with ID " + commentDto.getCertificateId() + " not found");
        }

        CommentEntity commentEntity = commentTransformer.toEntity(commentDto);
        commentEntity.setUser(user);
        commentEntity.setCertificate(certificate);

        commentRepository.persist(commentEntity);
        commentDto.setId(commentEntity.getId());
        return commentDto;
    }

    public CommentDto updateComment(Long id, CommentDto commentDto) {
        CommentEntity commentEntity = commentRepository.findById(id);
        if(commentEntity == null) {
            throw new EntityNotFoundException("Comment with ID " + id + " not found");
        }

        commentEntity.setComment(commentEntity.getComment());
        commentRepository.persist(commentEntity);
        return commentTransformer.toDto(commentEntity);
    }

    public CommentDto getComment(Long id) {
        CommentEntity commentEntity = commentRepository.findById(id);
        if(commentEntity == null) {
            throw new EntityNotFoundException("Comment with ID " + id + " not found");
        }
        return commentTransformer.toDto(commentEntity);
    }

    public String deleteComment(Long id) {
        CommentEntity commentEntity = commentRepository.findById(id);
        if(commentEntity == null) {
            throw new EntityNotFoundException("Comment with ID " + id + " not found");
        }
        commentRepository.delete(commentEntity);
        return "Comment with ID " + id + " was successfully deleted";
    }
}
