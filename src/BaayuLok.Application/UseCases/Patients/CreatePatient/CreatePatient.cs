using BaayuLok.Application.DTOs.Patients;
using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Domain.Enums;
using MediatR;

namespace BaayuLok.Application.UseCases.Patients.CreatePatient;

public class CreatePatientCommand : IRequest<Guid>
{
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
    public Guid CreatedByOfficerId { get; set; }
}

public class CreatePatientCommandHandler : IRequestHandler<CreatePatientCommand, Guid>
{
    private readonly IPatientRepository _patientRepository;

    public CreatePatientCommandHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<Guid> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<Gender>(request.Gender, true, out var gender))
        {
            throw new ArgumentException("Invalid gender. Use Male, Female, or Other.");
        }


        var patient = new Patient
        {
            Name = request.Name,
            Age = request.Age,
            Gender = gender,
            District = request.District,
            Disease = request.Disease,
            DepartmentId = request.DepartmentId,
            CriticalityScore = request.CriticalityScore,
            CostTotal = request.CostTotal,
            CostRaised = 0,
            DonorCount = 0,
            PhotoUrl = request.PhotoUrl,
            BipannaVerified = request.BipannaVerified,
            IsEmergency = request.IsEmergency,
            MedicalSummary = request.MedicalSummary,
            Status = PatientStatus.Draft,
            FraudFlag = false,
            CreatedByOfficerId = request.CreatedByOfficerId
        };

        await _patientRepository.AddAsync(patient);
        await _patientRepository.SaveChangesAsync();

        return patient.Id;
    }
}
