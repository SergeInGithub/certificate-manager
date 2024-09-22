package dccs.academy.dtos;

public class SupplierDto {
    private Long  id;
    private String name;
    private String supplierIndex;
    private String city;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
}
