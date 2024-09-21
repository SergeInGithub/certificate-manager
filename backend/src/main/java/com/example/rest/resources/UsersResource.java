package com.example.rest.resources;

import com.example.rest.dtos.UsersDto;
import com.example.rest.services.UsersService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/users")
public class UsersResource {

    @Inject
    UsersService usersService;

    @GET
    public List<UsersDto> getUsers() {
        return usersService.getUsers();
    }

    @POST
    public Response createUser(UsersDto usersDto) {
        UsersDto created = usersService.createUser(usersDto);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateUser(@PathParam("id") Long id, UsersDto usersDto) {
        UsersDto updated = usersService.updateUser(id, usersDto);
        return Response.ok(updated).build();
    }

    @GET
    @Path("/{id}")
    public Response getUser(@PathParam("id") Long id) {
        UsersDto user = usersService.getUser(id);
        return Response.ok(user).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") Long id) {
        String message = usersService.deleteUser(id);
        return Response.ok(message).build();
    }
}
