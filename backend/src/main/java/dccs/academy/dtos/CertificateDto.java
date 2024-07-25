package dccs.academy.dtos;

import dccs.academy.enums.CertificateType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.Set;

public class CertificateDto {
    private Long  id;
    private CertificateType type;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate validFrom;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate validTo;
    private Long supplierId;
    private String fileUrl;
    private Set<Long> assignedUserIds;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CertificateType getType() {
        return type;
    }

    public void setType(CertificateType type) {
        this.type = type;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Set<Long> getAssignedUserIds() {
        return assignedUserIds;
    }

    public void setAssignedUserIds(Set<Long> assignedUserIds) {
        this.assignedUserIds = assignedUserIds;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }
}