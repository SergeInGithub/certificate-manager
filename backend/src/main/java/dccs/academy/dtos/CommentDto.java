package dccs.academy.dtos;

public class CommentDto {
  private Long id;
  private String comment;
  private Long userId;
  private Long certificateId;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getCertificateId() {
    return certificateId;
  }

  public void setCertificateId(Long certificateId) {
    this.certificateId = certificateId;
  }
}
