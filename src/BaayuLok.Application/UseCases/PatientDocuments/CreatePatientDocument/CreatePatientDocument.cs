using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Domain.Enums;
using MediatR;

namespace BaayuLok.Application.UseCases.PatientDocuments.CreatePatientDocument;

public class CreatePatientDocumentCommand : IRequest<Guid>
{
    public Guid PatientId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
}

public class CreatePatientDocumentCommandHandler : IRequestHandler<CreatePatientDocumentCommand, Guid>
{
    private readonly IPatientDocumentRepository _patientDocumentRepository;

    public CreatePatientDocumentCommandHandler(IPatientDocumentRepository patientDocumentRepository)
    {
        _patientDocumentRepository = patientDocumentRepository;
    }

    public async Task<Guid> Handle(CreatePatientDocumentCommand request, CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<DocumentType>(request.Type, true, out var documentType))
            throw new ArgumentException("Invalid document type.");

        var document = new PatientDocument
        {
            PatientId = request.PatientId,
            Type = documentType,
            FileUrl = request.FileUrl,
            OriginalFileName = request.OriginalFileName,
            IsVerified = false
        };

        await _patientDocumentRepository.AddAsync(document);
        await _patientDocumentRepository.SaveChangesAsync();

        return document.Id;
    }
}
