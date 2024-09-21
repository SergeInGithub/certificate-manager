package com.example.rest.dtos;

public class UsersDto {
    private Long id;
    private String userIndex;
    private String name;
    private String firstName;
    private Long plant;
    private Long departmentId;


    // Getters and Setters
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Long getPlant() {
        return plant;
    }

    public void setPlant(Long plant) {
        this.plant = plant;
    }

    public Long getDepartmentId() { return departmentId; }

    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }


    @Override
    public String toString() {
        return "PersonDto{" +
                "id=" + id +
                ", userIndex='" + userIndex + '\'' +
                ", name='" + name + '\'' +
                ", firstName='" + firstName + '\'' +
                ", plant='" + plant + '\'' +
                ", departmentId=" + departmentId +
                '}';
    }
}
