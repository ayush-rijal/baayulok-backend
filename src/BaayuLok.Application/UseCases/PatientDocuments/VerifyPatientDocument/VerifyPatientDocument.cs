using BaayuLok.Application.Interfaces;
using MediatR;

namespace BaayuLok.Application.UseCases.PatientDocuments.VerifyPatientDocument;

public class VerifyPatientDocumentCommand : IRequest<bool>
{
    public Guid DocumentId { get; set; }
    public Guid VerifiedByUserId { get; set; }
}

public class VerifyPatientDocumentCommandHandler : IRequestHandler<VerifyPatientDocumentCommand, bool>
{
    private readonly IPatientDocumentRepository _patientDocumentRepository;

    public VerifyPatientDocumentCommandHandler(IPatientDocumentRepository patientDocumentRepository)
    {
        _patientDocumentRepository = patientDocumentRepository;
    }

    public async Task<bool> Handle(VerifyPatientDocumentCommand request, CancellationToken cancellationToken)
    {
        var document = await _patientDocumentRepository.GetByIdAsync(request.DocumentId);

        if (document == null)
            return false;

        document.IsVerified = true;
        document.VerifiedByUserId = request.VerifiedByUserId;
        document.VerifiedAt = DateTime.UtcNow;

        await _patientDocumentRepository.SaveChangesAsync();

        return true;
    }
}
