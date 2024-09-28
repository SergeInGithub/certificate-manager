package dccs.academy.resources;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.services.CertificateService;
import dccs.academy.utils.ResponseHandler;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/certificates")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CertificateResource {

    @Inject
    CertificateService certificateService;

    @GET
    public Response getCertificates() {
        try {
            return ResponseHandler.successResponse("Certificates successfully retrieved ", certificateService.getCertificates(), Response.Status.OK);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @GET
    @Path("/{id}")
    public Response getCertificate(@PathParam("id") Long id) {
        try {
            CertificateDto certificate = certificateService.getCertificate(id);
            return ResponseHandler.successResponse("Certificates retrieved successfully", certificate, Response.Status.FOUND);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }

    @POST
    public Response createCertificate(CertificateDto certificateDto) {
        try {
            CertificateDto createdCertificate = certificateService.createCertificate(certificateDto);
            return ResponseHandler.successResponse("Certificate created successfully", createdCertificate, Response.Status.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateCertificate(@PathParam("id") Long id, CertificateDto certificateDto) {
        try {
            CertificateDto updatedCertificate = certificateService.updateCertificate(id, certificateDto);
            return ResponseHandler.successResponse("Certificate updated successfully", updatedCertificate, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCertificate(@PathParam("id") Long id) {
        try {
            String message = certificateService.deleteCertificate(id);
            return ResponseHandler.successMessageResponse(message, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseHandler.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }
}
