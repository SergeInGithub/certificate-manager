package dccs.academy.exceptions;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class DuplicateExceptionMapper implements ExceptionMapper<DuplicateException> {
  @Override
  public Response toResponse(DuplicateException exception) {
    return Response.status(Response.Status.CONFLICT).entity(exception.getMessage()).build();
  }
}
