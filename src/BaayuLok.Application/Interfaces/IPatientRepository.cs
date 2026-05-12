using BaayuLok.Domain.Entities;

namespace BaayuLok.Application.Interfaces;

public interface IPatientRepository
{
    Task<List<Patient>> GetAllAsync();
    Task<Patient?> GetByIdAsync(Guid id);
    Task AddAsync(Patient patient);
    Task SaveChangesAsync();


}
