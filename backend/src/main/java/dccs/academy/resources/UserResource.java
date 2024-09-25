package dccs.academy.resources;

import dccs.academy.dtos.UserDto;
import dccs.academy.services.UsersService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UsersService usersService;

    @GET
    public List<UserDto> getUsers() {
        return usersService.getUsers();
    }

    @GET
    @Path("/search")
    public List<UserDto> searchUsers(
            @QueryParam("firstName") String firstName,
            @QueryParam("lastName") String lastName,
            @QueryParam("userIndex") String userIndex,
            @QueryParam("email") String email,
            @QueryParam("plant") String plant,
            @QueryParam("departmentName") String departmentName) {
        return usersService.searchUsers(firstName, lastName, userIndex, email, plant, departmentName);
    }

    @POST
    public Response createUser(UserDto userDto) {
        UserDto created = usersService.createUser(userDto);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateUser(@PathParam("id") Long id, UserDto userDto) {
        UserDto updated = usersService.updateUser(id, userDto);
        return Response.ok(updated).build();
    }

    @GET
    @Path("/{id}")
    public Response getUser(@PathParam("id") Long id) {
        UserDto user = usersService.getUser(id);
        return Response.ok(user).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") Long id) {
        String message = usersService.deleteUser(id);
        return Response.ok(message).build();
    }
}
