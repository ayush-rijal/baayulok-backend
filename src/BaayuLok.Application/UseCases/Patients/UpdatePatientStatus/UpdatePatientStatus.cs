using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Enums;
using MediatR;

namespace BaayuLok.Application.UseCases.Patients.UpdatePatientStatus;

public class UpdatePatientStatusCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class UpdatePatientStatusCommandHandler : IRequestHandler<UpdatePatientStatusCommand, bool>
{
    private readonly IPatientRepository _patientRepository;

    public UpdatePatientStatusCommandHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<bool> Handle(UpdatePatientStatusCommand request, CancellationToken cancellationToken)
    {
        var patient = await _patientRepository.GetByIdAsync(request.Id);

        if (patient == null)
            return false;

        if (!Enum.TryParse<PatientStatus>(request.Status, true, out var status))
            throw new ArgumentException("Invalid status. Use Draft, PendingReview, Active, Funded, Closed, or Rejected.");

        patient.Status = status;

        await _patientRepository.SaveChangesAsync();

        return true;
    }
}
