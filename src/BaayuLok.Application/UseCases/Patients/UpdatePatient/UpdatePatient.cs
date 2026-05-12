using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Enums;
using MediatR;

namespace BaayuLok.Application.UseCases.Patients.UpdatePatient;

public class UpdatePatientCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Disease { get; set; } = string.Empty;
    public Guid DepartmentId { get; set; }
    public int CriticalityScore { get; set; }
    public decimal CostTotal { get; set; }
    public string PhotoUrl { get; set; } = string.Empty;
    public bool BipannaVerified { get; set; }
    public bool IsEmergency { get; set; }
    public string MedicalSummary { get; set; } = string.Empty;
}

public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand, bool>
{
    private readonly IPatientRepository _patientRepository;

    public UpdatePatientCommandHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<bool> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
    {
        var patient = await _patientRepository.GetByIdAsync(request.Id);

        if (patient == null)
            return false;

        if (!Enum.TryParse<Gender>(request.Gender, true, out var gender))
            throw new ArgumentException("Invalid gender. Use Male, Female, or Other.");

        patient.Name = request.Name;
        patient.Age = request.Age;
        patient.Gender = gender;
        patient.District = request.District;
        patient.Disease = request.Disease;
        patient.DepartmentId = request.DepartmentId;
        patient.CriticalityScore = request.CriticalityScore;
        patient.CostTotal = request.CostTotal;
        patient.PhotoUrl = request.PhotoUrl;
        patient.BipannaVerified = request.BipannaVerified;
        patient.IsEmergency = request.IsEmergency;
        patient.MedicalSummary = request.MedicalSummary;

        await _patientRepository.SaveChangesAsync();

        return true;
    }
}
