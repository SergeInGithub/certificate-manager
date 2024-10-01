package dccs.academy.entities;

import dccs.academy.enums.CertificateType;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(schema = "certificate", name = "Certificate")
public class CertificateEntity extends BaseEntity {

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CertificateType type;

    @Column(name = "valid_from", nullable = false)
    private String validFrom;

    @Column(name = "valid_to", nullable = false)
    private String validTo;

    @ManyToMany
    @JoinTable(
            name = "assigned_users",
            schema = "certificate",
            joinColumns = @JoinColumn(name = "certificate_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<UserEntity> assignedUsers = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierEntity supplier;

    @Lob
    @Column(name = "file_data")
    private byte[] fileData;

    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL)
    private List<CommentEntity> comments;


    // Getters and Setters
    public CertificateType getType() {
        return type;
    }

    public void setType(CertificateType type) {
        this.type = type;
    }

    public String getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(String validFrom) {
        this.validFrom = validFrom;
    }

    public String getValidTo() {
        return validTo;
    }

    public void setValidTo(String validTo) {
        this.validTo = validTo;
    }

    public Set<UserEntity> getAssignedUsers() {
        return assignedUsers;
    }

    public void setAssignedUsers(Set<UserEntity> assignedUsers) {
        this.assignedUsers = assignedUsers;
    }

    public SupplierEntity getSupplier() {
        return supplier;
    }

    public void setSupplier(SupplierEntity supplier) {
        this.supplier = supplier;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public List<CommentEntity> getComments() {
        return comments;
    }

    public void setComments(List<CommentEntity> comments) {
        this.comments = comments;
    }
}
