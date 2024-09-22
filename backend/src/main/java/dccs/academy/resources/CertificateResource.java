package dccs.academy.resources;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.services.CertificateService;
import jakarta.inject.Inject;
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
    public List<CertificateDto> getCertificates() {
        return certificateService.getCertificates();
    }

    @GET
    @Path("/{id}")
    public Response getCertificate(@PathParam("id") Long id) {
        CertificateDto certificate = certificateService.getCertificate(id);
        return Response.ok(certificate).build();
    }

    @POST
    public Response createCertificate(CertificateDto certificateDto) {
        CertificateDto createdCertificate = certificateService.createCertificate(certificateDto);
        return Response.status(Response.Status.CREATED).entity(createdCertificate).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateCertificate(@PathParam("id") Long id, CertificateDto certificateDto) {
        CertificateDto updatedCertificate = certificateService.updateCertificate(id, certificateDto);
        return Response.ok(updatedCertificate).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCertificate(@PathParam("id") Long id) {
        String message = certificateService.deleteCertificate(id);
        return Response.ok(message).build();
    }
}
