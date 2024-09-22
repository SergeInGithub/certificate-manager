package dccs.academy.resources;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.services.SupplierService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/suppliers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierResource {

    @Inject
    SupplierService supplierService;

    @GET
    public List<SupplierDto> getSuppliers() {
        return supplierService.getSuppliers();
    }

    @GET
    @Path("/search")
    public Response searchSuppliers(@QueryParam("name") String name,
                                    @QueryParam("supplierIndex") String supplierIndex,
                                    @QueryParam("city") String city) {
        List<SupplierDto> suppliers = supplierService.searchSuppliers(name, supplierIndex, city);
        return Response.ok(suppliers).build();
    }

    @GET
    @Path("/{id}")
    public Response getSupplier(@PathParam("id") Long id) {
        SupplierDto supplier = supplierService.getSupplier(id);
        return Response.ok(supplier).build();
    }

    @POST
    public Response createSupplier(SupplierDto supplierDto){
        SupplierDto createdSupplier = supplierService.createSupplier(supplierDto);
        return Response.status(Response.Status.CREATED).entity(createdSupplier).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateSupplier(@PathParam("id") Long id, SupplierDto supplierDto) {
        SupplierDto updatedSupplier = supplierService.updateSupplier(id, supplierDto);
        return Response.ok(updatedSupplier).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteSupplier(@PathParam("id") Long id) {
        String message = supplierService.deleteSupplier(id);
        return Response.ok(message).build();
    }
}
