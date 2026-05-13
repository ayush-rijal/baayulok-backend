namespace BaayuLok.Application.DTOs.Donations;

public class DonationDto
{
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public Guid? DonorUserId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
    public string GatewayReference { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}
