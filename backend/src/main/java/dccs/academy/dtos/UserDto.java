package dccs.academy.dtos;

public class UserDto {
    private Long id;
    private String email;
    private String userIndex;
    private String firstName;
    private String lastName;
    private String plant;
    private Long departmentId;


    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserIndex() {
        return userIndex;
    }

    public void setUserIndex(String userIndex) {
        this.userIndex = userIndex;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public Long getDepartmentId() { return departmentId; }

    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }


    @Override
    public String toString() {
        return "PersonDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", userIndex='" + userIndex + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", plant='" + plant + '\'' +
                ", departmentId=" + departmentId +
                '}';
    }
}
