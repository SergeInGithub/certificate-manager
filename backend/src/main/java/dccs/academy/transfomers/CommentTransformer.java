package dccs.academy.transfomers;

import dccs.academy.dtos.CommentDto;
import dccs.academy.entities.CommentEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CommentTransformer {

  public CommentDto toDto(CommentEntity commentEntity) {
    CommentDto commentDto = new CommentDto();
    commentDto.setId(commentEntity.getId());
    commentDto.setComment(commentEntity.getComment());
    commentDto.setUserId(commentEntity.getUser().getId());
    commentDto.setCertificateId(commentEntity.getCertificate().getId());
    return commentDto;
  }

  public CommentEntity toEntity(CommentDto commentDto) {
    CommentEntity commentEntity = new CommentEntity();
    commentEntity.setComment(commentDto.getComment());
    return commentEntity;
  }
}
