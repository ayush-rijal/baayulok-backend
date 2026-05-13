using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Domain.Enums;
using MediatR;
using BaayuLok.Application.Exceptions;


namespace BaayuLok.Application.UseCases.Donations.CreateDonation;

public class CreateDonationCommand : IRequest<Guid>
{
    public Guid PatientId { get; set; }
    public Guid? DonorUserId { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string GatewayReference { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class CreateDonationCommandHandler : IRequestHandler<CreateDonationCommand, Guid>
{
    private readonly IDonationRepository _donationRepository;
    private readonly IPatientRepository _patientRepository;

    public CreateDonationCommandHandler(
        IDonationRepository donationRepository,
        IPatientRepository patientRepository)
    {
        _donationRepository = donationRepository;
        _patientRepository = patientRepository;
    }

    public async Task<Guid> Handle(CreateDonationCommand request, CancellationToken cancellationToken)
    {
        var patient = await _patientRepository.GetByIdAsync(request.PatientId);

        if (patient == null)
            throw new NotFoundException("Patient not found.");
        if(request.Amount<=0)
            throw new ArgumentException("Amount must be greater than 0."); 
        var remainingAmount=patient.CostTotal-patient.CostRaised;

        if(remainingAmount<=0)
            throw new InvalidOperationException("Patient is already fully funded.");    
        if(request.Amount>remainingAmount)  
            throw new InvalidOperationException("Donation amount exceeds remaining cost.");     

        if (!Enum.TryParse<PaymentMethod>(request.PaymentMethod, true, out var paymentMethod))
            throw new ArgumentException("Invalid payment method.");

        var donation = new Donation
        {
            PatientId = request.PatientId,
            DonorUserId = request.DonorUserId,
            Amount = request.Amount,
            Currency = "NPR",
            PaymentMethod = paymentMethod,
            GatewayReference = request.GatewayReference,
            Status = DonationStatus.Completed,
            Message = request.Message,
            CompletedAt = DateTime.UtcNow
        };

        patient.CostRaised += request.Amount;
        patient.DonorCount += 1;

        if(patient.CostRaised>=patient.CostTotal)
        {
            patient.Status = PatientStatus.Funded;
        }

        await _donationRepository.AddAsync(donation);
        await _donationRepository.SaveChangesAsync();

        return donation.Id;
    }
}
