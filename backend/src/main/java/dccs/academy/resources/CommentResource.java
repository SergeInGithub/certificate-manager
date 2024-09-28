package dccs.academy.resources;

import dccs.academy.dtos.CommentDto;
import dccs.academy.services.CommentService;
import dccs.academy.utils.ResponseHandler;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
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
    public Response getComments() {

        try {
            return ResponseHandler.successResponse("Comments retrieved successfully", commentService.getComments(), Response.Status.OK);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @POST
    public Response createComment(CommentDto commentDto) {
        try {
            CommentDto newComment = commentService.createComment(commentDto);
            return ResponseHandler.successResponse("Comment created successfully", newComment, Response.Status.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateComment(@PathParam("id") Long id, CommentDto commentDto) {
        try {
            CommentDto updatedComment = commentService.updateComment(id, commentDto);
            return ResponseHandler.successResponse("Comment updated successfully", updatedComment, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @GET
    @Path("/{id}")
    public Response getComment(@PathParam("id") Long id) {
        try {
            CommentDto comment = commentService.getComment(id);
            return ResponseHandler.successResponse("Comment retrieved successfully", comment, Response.Status.FOUND);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteComment(@PathParam("id") Long id) {
        try {
            String message = commentService.deleteComment(id);
            return ResponseHandler.successMessageResponse(message, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }
}
