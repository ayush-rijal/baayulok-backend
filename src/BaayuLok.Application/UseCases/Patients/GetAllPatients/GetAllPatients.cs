using BaayuLok.Application.DTOs.Patients;
using BaayuLok.Application.Interfaces;
using MediatR;

namespace BaayuLok.Application.UseCases.Patients.GetAllPatients;

public class GetAllPatientsQuery : IRequest<List<PatientDto>>
{
}

public class GetAllPatientsQueryHandler : IRequestHandler<GetAllPatientsQuery, List<PatientDto>>
{
    private readonly IPatientRepository _patientRepository;

    public GetAllPatientsQueryHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<List<PatientDto>> Handle(GetAllPatientsQuery request, CancellationToken cancellationToken)
    {
        var patients = await _patientRepository.GetAllAsync();

        return patients.Select(p => new PatientDto
        {
            Id = p.Id,
            Name = p.Name,
            Age = p.Age,
            Gender = p.Gender.ToString(),
            District = p.District,
            Disease = p.Disease,
            DepartmentId = p.DepartmentId,
            DepartmentName = p.Department?.Name ?? string.Empty,
            CriticalityScore = p.CriticalityScore,
            CostTotal = p.CostTotal,
            CostRaised = p.CostRaised,
            DonorCount = p.DonorCount,
            PhotoUrl = p.PhotoUrl,
            BipannaVerified = p.BipannaVerified,
            IsEmergency = p.IsEmergency,
            MedicalSummary = p.MedicalSummary,
            Status = p.Status.ToString(),
            FraudFlag = p.FraudFlag,
            CreatedAt = p.CreatedAt
        }).ToList();
    }
}
