namespace BaayuLok.Application.DTOs.Donations;

public class CreateDonationRequest
{
    public Guid? DonorUserId { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string GatewayReference { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
