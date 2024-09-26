package dccs.academy.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(schema = "certificate", name = "Supplier")
public class SupplierEntity extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "supplier_index", nullable = false)
    private String supplierIndex;

    @Column(name = "city", nullable = false)
    private String city;

    @OneToMany(mappedBy = "supplier")
    private List<CertificateEntity> certificates;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupplierIndex() {
        return supplierIndex;
    }

    public void setSupplierIndex(String supplierIndex) {
        this.supplierIndex = supplierIndex;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public List<CertificateEntity> getCertificates() {
        return certificates;
    }

    public void setCertificates(List<CertificateEntity> certificates) {
        this.certificates = certificates;
    }
}
