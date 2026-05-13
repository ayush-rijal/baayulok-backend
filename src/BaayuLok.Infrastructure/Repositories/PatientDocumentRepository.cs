using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BaayuLok.Infrastructure.Repositories;

public class PatientDocumentRepository : IPatientDocumentRepository
{
    private readonly ApplicationDbContext _context;

    public PatientDocumentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<PatientDocument>> GetByPatientIdAsync(Guid patientId)
    {
        return await _context.PatientDocuments
            .Where(d => d.PatientId == patientId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

public async Task AddAsync(PatientDocument document)
{
    await _context.PatientDocuments.AddAsync(document);
}

public async Task SaveChangesAsync()
{
    await _context.SaveChangesAsync();
}
public async Task<PatientDocument?> GetByIdAsync(Guid id)
{
    return await _context.PatientDocuments
        .SingleOrDefaultAsync(d => d.Id == id);
}


}
