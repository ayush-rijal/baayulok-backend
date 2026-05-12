using BaayuLok.Application.DTOs.Patients;
using BaayuLok.Application.Interfaces;
using MediatR;

namespace BaayuLok.Application.UseCases.Patients.GetPatientById;

public class GetPatientByIdQuery : IRequest<PatientDto?>
{
    public Guid Id { get; set; }
}

public class GetPatientByIdQueryHandler : IRequestHandler<GetPatientByIdQuery, PatientDto?>
{
    private readonly IPatientRepository _patientRepository;

    public GetPatientByIdQueryHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<PatientDto?> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
    {
        var patient = await _patientRepository.GetByIdAsync(request.Id);

        if (patient == null)
            return null;

        return new PatientDto
        {
            Id = patient.Id,
            Name = patient.Name,
            Age = patient.Age,
            Gender = patient.Gender.ToString(),
            District = patient.District,
            Disease = patient.Disease,
            DepartmentId = patient.DepartmentId,
            DepartmentName = patient.Department?.Name ?? string.Empty,
            CriticalityScore = patient.CriticalityScore,
            CostTotal = patient.CostTotal,
            CostRaised = patient.CostRaised,
            DonorCount = patient.DonorCount,
            PhotoUrl = patient.PhotoUrl,
            BipannaVerified = patient.BipannaVerified,
            IsEmergency = patient.IsEmergency,
            MedicalSummary = patient.MedicalSummary,
            Status = patient.Status.ToString(),
            FraudFlag = patient.FraudFlag,
            CreatedAt = patient.CreatedAt
        };
    }
}
