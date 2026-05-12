using BaayuLok.Domain.Enums;

namespace BaayuLok.Domain.Entities;

public class Patient
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public Gender Gender { get; set; }
    public string District { get; set; } = string.Empty;
    public string Disease { get; set; } = string.Empty;
    
    // Relationship: A patient belongs to a Department
    public Guid DepartmentId { get; set; }
    public Department? Department { get; set; }

    // AI & Finance Stats
    public int CriticalityScore { get; set; } 
    public decimal CostTotal { get; set; }
    public decimal CostRaised { get; set; }
    public int DonorCount { get; set; }
    
    // Details
    public string PhotoUrl { get; set; } = string.Empty;
    public bool BipannaVerified { get; set; }
    public bool IsEmergency { get; set; }
    public string MedicalSummary { get; set; } = string.Empty;
    
    // Status & Admin
    public PatientStatus Status { get; set; } = PatientStatus.Draft;
    public bool FraudFlag { get; set; } 
    
    // Relationship: Which Officer created this case
    public Guid CreatedByOfficerId { get; set; }
    public User? CreatedByOfficer { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
