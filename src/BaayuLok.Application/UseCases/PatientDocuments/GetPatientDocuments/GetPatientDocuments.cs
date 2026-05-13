using BaayuLok.Application.DTOs.PatientDocuments;
using BaayuLok.Application.Interfaces;
using MediatR;

namespace BaayuLok.Application.UseCases.PatientDocuments.GetPatientDocuments;

public class GetPatientDocumentsQuery : IRequest<List<PatientDocumentDto>>
{
    public Guid PatientId { get; set; }
}

public class GetPatientDocumentsQueryHandler : IRequestHandler<GetPatientDocumentsQuery, List<PatientDocumentDto>>
{
    private readonly IPatientDocumentRepository _patientDocumentRepository;

    public GetPatientDocumentsQueryHandler(IPatientDocumentRepository patientDocumentRepository)
    {
        _patientDocumentRepository = patientDocumentRepository;
    }

    public async Task<List<PatientDocumentDto>> Handle(GetPatientDocumentsQuery request, CancellationToken cancellationToken)
    {
        var documents = await _patientDocumentRepository.GetByPatientIdAsync(request.PatientId);

        return documents.Select(d => new PatientDocumentDto
        {
            Id = d.Id,
            PatientId = d.PatientId,
            Type = d.Type.ToString(),
            FileUrl = d.FileUrl,
            OriginalFileName = d.OriginalFileName,
            IsVerified = d.IsVerified,
            VerifiedByUserId = d.VerifiedByUserId,
            VerifiedAt = d.VerifiedAt,
            CreatedAt = d.CreatedAt
        }).ToList();
    }
}
