package dccs.academy.utils;

import jakarta.ws.rs.core.Response;
import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseHandler {
  public static Response successResponse(String message, Object entity, Response.Status status) {
    Map<String, Object> response = new LinkedHashMap<>();
    response.put("message", message);
    response.put("status", status.getStatusCode());
    if (entity != null) {
      response.put("data", entity);
    }
    return Response.status(status).entity(response).build();
  }

  public static Response successMessageResponse(String message, Response.Status status) {
    Map<String, Object> response = new LinkedHashMap<>();
    response.put("message", message);
    response.put("status", status.getStatusCode());
    return Response.status(status).entity(response).build();
  }

  public static Response errorResponse(String errorMessage, Response.Status status) {
    Map<String, Object> errorResponse = new LinkedHashMap<>();
    errorResponse.put("message", errorMessage);
    errorResponse.put("status", status.getStatusCode());
    return Response.status(status).entity(errorResponse).build();
  }
}
