using BaayuLok.Application.DTOs.PatientDocuments;
using BaayuLok.Application.UseCases.PatientDocuments.VerifyPatientDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BaayuLok.Api.Controllers;

[ApiController]
[Route("api/patient-documents")]
public class PatientDocumentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PatientDocumentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPatch("{documentId:guid}/verify")]
    public async Task<IActionResult> Verify(Guid documentId, [FromBody] VerifyPatientDocumentRequest request)
    {
        if (request.VerifiedByUserId == Guid.Empty)
            return BadRequest("VerifiedByUserId is required.");

        var command = new VerifyPatientDocumentCommand
        {
            DocumentId = documentId,
            VerifiedByUserId = request.VerifiedByUserId
        };

        var verified = await _mediator.Send(command);

        if (!verified)
            return NotFound();

        return NoContent();
    }
}
