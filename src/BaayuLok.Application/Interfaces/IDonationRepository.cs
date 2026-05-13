using BaayuLok.Domain.Entities;

namespace BaayuLok.Application.Interfaces;

public interface IDonationRepository
{
    Task<List<Donation>> GetByPatientIdAsync(Guid patientId);
    Task AddAsync(Donation donation);
    Task SaveChangesAsync();
}
