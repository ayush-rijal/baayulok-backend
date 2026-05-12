namespace BaayuLok.Application.DTOs.Patients;

public class PatientDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Disease { get; set; } = string.Empty;
    public Guid DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
    public int CriticalityScore { get; set; }
    public decimal CostTotal { get; set; }
    public decimal CostRaised { get; set; }
    public int DonorCount { get; set; }
    public string PhotoUrl { get; set; } = string.Empty;
    public bool BipannaVerified { get; set; }
    public bool IsEmergency { get; set; }
    public string MedicalSummary { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public bool FraudFlag { get; set; }
    public DateTime CreatedAt { get; set; }
}
