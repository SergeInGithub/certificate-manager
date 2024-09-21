package com.example.rest.resources;

import com.example.rest.dtos.DepartmentDto;
import com.example.rest.services.DepartmentService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/departments")
@Produces(MediaType.APPLICATION_JSON)
public class DepartmentResource {

    @Inject
    DepartmentService departmentService;

    @GET
    public List<DepartmentDto> getDepartments() {
        return departmentService.getDepartments();
    }

    @POST
    public Response createDepartment(DepartmentDto departmentDto) {
        DepartmentDto created = departmentService.createDepartment(departmentDto);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateDepartment(@PathParam("id") Long id, DepartmentDto departmentDto) {
        DepartmentDto updated = departmentService.updateDepartment(id, departmentDto);
        return Response.ok(updated).build();
    }

    @GET
    @Path("/{id}")
    public Response getDepartment(@PathParam("id") Long id) {
        DepartmentDto department = departmentService.getDepartment(id);
        return Response.ok(department).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteDepartment(@PathParam("id") Long id) {
        String message = departmentService.deleteDepartment(id);
        return Response.ok(message).build();
    }
}