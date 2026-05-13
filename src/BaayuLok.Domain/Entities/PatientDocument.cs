using BaayuLok.Domain.Enums;

namespace BaayuLok.Domain.Entities;

public class PatientDocument
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }

    public DocumentType Type { get; set; }

    // For now this can be a URL or local path.
    // Later this will become S3/MinIO/R2 file key.
    public string FileUrl { get; set; } = string.Empty;

    public string OriginalFileName { get; set; } = string.Empty;

    public bool IsVerified { get; set; } = false;

    public Guid? VerifiedByUserId { get; set; }
    public User? VerifiedByUser { get; set; }

    public DateTime? VerifiedAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
