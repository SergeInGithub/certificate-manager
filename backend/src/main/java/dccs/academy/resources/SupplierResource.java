package dccs.academy.resources;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.exceptions.DuplicateException;
import dccs.academy.services.SupplierService;
import dccs.academy.utils.ResponseHandler;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/suppliers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierResource {

  @Inject SupplierService supplierService;

  @GET
  public Response getSuppliers() {
    try {
      return ResponseHandler.successResponse(
          "Suppliers retrieved successfully", supplierService.getSuppliers(), Response.Status.OK);
    } catch (Exception e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
    }
  }

  @GET
  @Path("/search")
  public Response searchSuppliers(
      @QueryParam("name") String name,
      @QueryParam("supplierIndex") String supplierIndex,
      @QueryParam("city") String city) {
    try {
      List<SupplierDto> suppliers = supplierService.searchSuppliers(name, supplierIndex, city);
      return ResponseHandler.successResponse(
          "Search results retrieved successfully", suppliers, Response.Status.OK);
    } catch (Exception e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
    }
  }

  @GET
  @Path("/{id}")
  public Response getSupplier(@PathParam("id") Long id) {
    try {
      SupplierDto supplier = supplierService.getSupplier(id);
      return ResponseHandler.successResponse(
          "Supplier retrieved successfully", supplier, Response.Status.OK);
    } catch (EntityNotFoundException e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
    }
  }

  @POST
  public Response createSupplier(SupplierDto supplierDto) {
    try {
      SupplierDto createdSupplier = supplierService.createSupplier(supplierDto);
      return ResponseHandler.successResponse(
          "Supplier created successfully", createdSupplier, Response.Status.CREATED);
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
  public Response updateSupplier(@PathParam("id") Long id, SupplierDto supplierDto) {
    try {
      SupplierDto updatedSupplier = supplierService.updateSupplier(id, supplierDto);
      return ResponseHandler.successResponse(
          "Supplier updated successfully", updatedSupplier, Response.Status.OK);
    } catch (EntityNotFoundException e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
    } catch (Exception e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
    }
  }

  @DELETE
  @Path("/{id}")
  public Response deleteSupplier(@PathParam("id") Long id) {
    try {
      String message = supplierService.deleteSupplier(id);
      return ResponseHandler.successMessageResponse(message, Response.Status.OK);
    } catch (EntityNotFoundException e) {
      return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
    }
  }
}
