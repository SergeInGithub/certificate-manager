package dccs.academy.resources;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.services.DepartmentService;
import dccs.academy.utils.ResponseHandler;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/departments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DepartmentResource {

  @Inject DepartmentService departmentService;

  @GET
  public Response getDepartments() {
    try {
      return ResponseHandler.successResponse(
          "Departments retrieved successfully",
          departmentService.getDepartments(),
          Response.Status.OK);
    } catch (Exception e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
    }
  }

  @POST
  public Response createDepartment(DepartmentDto departmentDto) {
    try {
      DepartmentDto created = departmentService.createDepartment(departmentDto);
      return ResponseHandler.successResponse(
          "Department created successfully", created, Response.Status.CREATED);
    } catch (Exception e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
    }
  }

  @PUT
  @Path("/{id}")
  public Response updateDepartment(@PathParam("id") Long id, DepartmentDto departmentDto) {
    try {
      DepartmentDto updated = departmentService.updateDepartment(id, departmentDto);
      return ResponseHandler.successResponse(
          "Department updated successfully", updated, Response.Status.CREATED);
    } catch (EntityNotFoundException e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
    } catch (Exception e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
    }
  }

  @GET
  @Path("/{id}")
  public Response getDepartment(@PathParam("id") Long id) {
    try {
      DepartmentDto department = departmentService.getDepartment(id);
      return ResponseHandler.successResponse(
          "Department retrieved successfully", department, Response.Status.OK);
    } catch (EntityNotFoundException e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
    }
  }

  @DELETE
  @Path("/{id}")
  public Response deleteDepartment(@PathParam("id") Long id) {
    try {
      String message = departmentService.deleteDepartment(id);
      return ResponseHandler.successMessageResponse(message, Response.Status.OK);
    } catch (EntityNotFoundException e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
    }
  }
}
