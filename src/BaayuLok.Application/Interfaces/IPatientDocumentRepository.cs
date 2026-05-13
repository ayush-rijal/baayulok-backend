using BaayuLok.Domain.Entities;

namespace BaayuLok.Application.Interfaces;

public interface IPatientDocumentRepository
{
    Task<List<PatientDocument>> GetByPatientIdAsync(Guid patientId);
    Task AddAsync(PatientDocument document);
    Task SaveChangesAsync();
    Task<PatientDocument?> GetByIdAsync(Guid id);

}
