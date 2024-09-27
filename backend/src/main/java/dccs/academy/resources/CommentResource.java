package dccs.academy.resources;

import dccs.academy.dtos.CommentDto;
import dccs.academy.services.CommentService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/comments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CommentResource {

    @Inject
    CommentService commentService;

    @GET
    public List<CommentDto> getComments() {
        return commentService.getComments();
    }

    @POST
    public Response createComment(CommentDto commentDto) {
        CommentDto newComment = commentService.createComment(commentDto);
        return Response.status(Response.Status.CREATED).entity(newComment).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateComment(@PathParam("id") Long id, CommentDto commentDto) {
        CommentDto updatedComment = commentService.updateComment(id, commentDto);
        return  Response.ok(updatedComment).build();
    }

    @GET
    @Path("/{id}")
    public Response getComment(@PathParam("id") Long id) {
        CommentDto comment = commentService.getComment(id);
        return Response.ok(comment).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteComment(@PathParam("id") Long id) {
        String message = commentService.deleteComment(id);
        return Response.ok(message).build();
    }
}
