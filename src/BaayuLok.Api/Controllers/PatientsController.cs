using BaayuLok.Application.UseCases.Patients.GetAllPatients;
using BaayuLok.Application.UseCases.Patients.GetPatientById;
using BaayuLok.Application.DTOs.Patients;
using BaayuLok.Application.UseCases.Patients.CreatePatient;
using BaayuLok.Application.UseCases.Patients.UpdatePatient;
using BaayuLok.Application.UseCases.Patients.UpdatePatientStatus;
using BaayuLok.Application.UseCases.PatientDocuments.GetPatientDocuments;
using BaayuLok.Application.DTOs.PatientDocuments;
using BaayuLok.Application.UseCases.PatientDocuments.CreatePatientDocument;


using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BaayuLok.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PatientsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var patients = await _mediator.Send(new GetAllPatientsQuery());
        return Ok(patients);
    }

[HttpGet("{id:guid}")]
public async Task<IActionResult> GetById(Guid id)
{
    var patient = await _mediator.Send(new GetPatientByIdQuery
    {
        Id = id
    });

    if (patient == null)
        return NotFound();

    return Ok(patient);
}
[HttpPost]
public async Task<IActionResult> Create([FromBody] CreatePatientRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Name))
        return BadRequest("Patient name is required.");

    if (request.Age <= 0)
            return BadRequest("Age must be greater than 0.");

    if (request.Gender != "Male" && request.Gender != "Female" && request.Gender != "Other")
        return BadRequest("Gender must be Male, Female, or Other.");

    if (string.IsNullOrWhiteSpace(request.District))
        return BadRequest("District is required.");

    if (string.IsNullOrWhiteSpace(request.Disease))
        return BadRequest("Disease is required.");

    if (request.DepartmentId == Guid.Empty)
        return BadRequest("DepartmentId is required.");

    if (request.CriticalityScore < 0 || request.CriticalityScore > 100)
        return BadRequest("CriticalityScore must be between 0 and 100.");

    if (request.CostTotal <= 0)
        return BadRequest("CostTotal must be greater than 0.");

    if (request.CreatedByOfficerId == Guid.Empty)
        return BadRequest("CreatedByOfficerId is required.");

    var command = new CreatePatientCommand
    {
        Name = request.Name,
        Age = request.Age,
        Gender = request.Gender,
        District = request.District,
        Disease = request.Disease,
        DepartmentId = request.DepartmentId,
        CriticalityScore = request.CriticalityScore,
        CostTotal = request.CostTotal,
        PhotoUrl = request.PhotoUrl,
        BipannaVerified = request.BipannaVerified,
        IsEmergency = request.IsEmergency,
        MedicalSummary = request.MedicalSummary,
        CreatedByOfficerId = request.CreatedByOfficerId
    };

    var patientId = await _mediator.Send(command);

    return Ok(new
    {
        PatientId = patientId
    });
}
[HttpPut("{id:guid}")]
public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePatientRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Name))
        return BadRequest("Patient name is required.");

    if (request.Age <= 0)
        return BadRequest("Age must be greater than 0.");

    if (request.Gender != "Male" && request.Gender != "Female" && request.Gender != "Other")
        return BadRequest("Gender must be Male, Female, or Other.");

    if (string.IsNullOrWhiteSpace(request.District))
        return BadRequest("District is required.");

    if (string.IsNullOrWhiteSpace(request.Disease))
        return BadRequest("Disease is required.");

    if (request.DepartmentId == Guid.Empty)
        return BadRequest("DepartmentId is required.");

    if (request.CriticalityScore < 0 || request.CriticalityScore > 100)
        return BadRequest("CriticalityScore must be between 0 and 100.");

    if (request.CostTotal <= 0)
        return BadRequest("CostTotal must be greater than 0.");

    var command = new UpdatePatientCommand
    {
        Id = id,
        Name = request.Name,
        Age = request.Age,
        Gender = request.Gender,
        District = request.District,
        Disease = request.Disease,
        DepartmentId = request.DepartmentId,
        CriticalityScore = request.CriticalityScore,
        CostTotal = request.CostTotal,
        PhotoUrl = request.PhotoUrl,
        BipannaVerified = request.BipannaVerified,
        IsEmergency = request.IsEmergency,
        MedicalSummary = request.MedicalSummary
    };

    var updated = await _mediator.Send(command);

    if (!updated)
        return NotFound();

    return NoContent();
}

[HttpPatch("{id:guid}/status")]
public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdatePatientStatusRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Status))
        return BadRequest("Status is required.");

    var allowedStatuses = new[]
    {
        "Draft",
        "PendingReview",
        "Active",
        "Funded",
        "Closed",
        "Rejected"
    };

    if (!allowedStatuses.Contains(request.Status,StringComparer.OrdinalIgnoreCase))
        return BadRequest("Status must be Draft, PendingReview, Active, Funded, Closed, or Rejected.");

    var command = new UpdatePatientStatusCommand
    {
        Id = id,
        Status = request.Status
    };

    var updated = await _mediator.Send(command);

    if (!updated)
        return NotFound();

    return NoContent();
}
[HttpGet("{patientId:guid}/documents")]
public async Task<IActionResult> GetDocuments(Guid patientId)
{
    var documents = await _mediator.Send(new GetPatientDocumentsQuery
    {
        PatientId = patientId
    });

    return Ok(documents);
}
[HttpPost("{patientId:guid}/documents")]
public async Task<IActionResult> CreateDocument(Guid patientId, [FromBody] CreatePatientDocumentRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Type))
        return BadRequest("Document type is required.");

    if (string.IsNullOrWhiteSpace(request.FileUrl))
        return BadRequest("FileUrl is required.");

    if (string.IsNullOrWhiteSpace(request.OriginalFileName))
        return BadRequest("OriginalFileName is required.");

    var command = new CreatePatientDocumentCommand
    {
        PatientId = patientId,
        Type = request.Type,
        FileUrl = request.FileUrl,
        OriginalFileName = request.OriginalFileName
    };

    var documentId = await _mediator.Send(command);

    return Ok(new
    {
        DocumentId = documentId
    });
}


}
