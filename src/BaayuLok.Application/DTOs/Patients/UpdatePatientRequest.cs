namespace BaayuLok.Application.DTOs.Patients;

public class UpdatePatientRequest
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
}
