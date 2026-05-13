using BaayuLok.Domain.Enums;

namespace BaayuLok.Domain.Entities;

public class Donation
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }

    public Guid? DonorUserId { get; set; } //it can be null because public donation platform often allow people to donate people without creating an accoung
    public User? DonorUser { get; set; }

    public decimal Amount { get; set; }
    public string Currency { get; set; } = "NPR";

    public PaymentMethod PaymentMethod { get; set; }
    public string GatewayReference { get; set; } = string.Empty;

    public DonationStatus Status { get; set; } = DonationStatus.Pending;

    public string Message { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
}
