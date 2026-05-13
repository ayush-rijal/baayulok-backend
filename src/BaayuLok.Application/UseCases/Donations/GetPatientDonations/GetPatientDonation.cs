using BaayuLok.Application.DTOs.Donations;
using BaayuLok.Application.Interfaces;
using MediatR;

namespace BaayuLok.Application.UseCases.Donations.GetPatientDonations;



public class GetPatientDonationsQuery: IRequest<List<DonationDto>>{
    public Guid PatientId { get; set; }
}

public class GetPatientDonationsQueryHandler:IRequestHandler<GetPatientDonationsQuery,List<DonationDto>>{
    private readonly IDonationRepository _donationRepository;

    public GetPatientDonationsQueryHandler(IDonationRepository donationRepository){
        _donationRepository=donationRepository;
    }


    public async Task<List<DonationDto>> Handle(GetPatientDonationsQuery request,CancellationToken cancellationToken){
        var donations=await _donationRepository.GetByPatientIdAsync(request.PatientId);

        return donations.Select(d => new DonationDto
        {
            Id=d.Id,
            PatientId=d.PatientId,
            DonorUserId=d.DonorUserId,
            Amount=d.Amount,
            Currency=d.Currency,
            PaymentMethod=d.PaymentMethod.ToString(),
            GatewayReference=d.GatewayReference,
            Status=d.Status.ToString(),
            Message=d.Message,
            CreatedAt=d.CreatedAt,
            CompletedAt=d.CompletedAt
        }).ToList();
    }
}