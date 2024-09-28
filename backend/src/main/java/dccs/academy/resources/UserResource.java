package dccs.academy.resources;

import dccs.academy.dtos.UserDto;
import dccs.academy.exceptions.DuplicateException;
import dccs.academy.services.UserService;
import dccs.academy.utils.ResponseHandler;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @GET
    public Response getUsers() {
        try {
            return ResponseHandler.successResponse("Users retrieved successfully", userService.getUsers(), Response.Status.OK);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @GET
    @Path("/search")
    public Response searchUsers(
            @QueryParam("firstName") String firstName,
            @QueryParam("lastName") String lastName,
            @QueryParam("userIndex") String userIndex,
            @QueryParam("email") String email,
            @QueryParam("plant") String plant,
            @QueryParam("departmentName") String departmentName) {
        try {
            List<UserDto> users = userService.searchUsers(firstName, lastName, userIndex, email, plant, departmentName);
            return ResponseHandler.successResponse("Search results retrieved successfully", users, Response.Status.OK);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @POST
    public Response createUser(UserDto userDto) {
        try {
            UserDto created = userService.createUser(userDto);
            return ResponseHandler.successResponse("User created successfully", created, Response.Status.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (DuplicateException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.CONFLICT);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateUser(@PathParam("id") Long id, UserDto userDto) {
        try {
            UserDto updated = userService.updateUser(id, userDto);
            return ResponseHandler.successResponse("User updated successfully", updated, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (DuplicateException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.CONFLICT);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @GET
    @Path("/{id}")
    public Response getUser(@PathParam("id") Long id) {
        try {
            UserDto user = userService.getUser(id);
            return ResponseHandler.successResponse("User retrieved successfully", user, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") Long id) {
        try {
            String message = userService.deleteUser(id);
            return ResponseHandler.successMessageResponse(message, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }
}
