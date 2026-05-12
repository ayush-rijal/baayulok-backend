using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BaayuLok.Infrastructure.Repositories;

public class PatientRepository : IPatientRepository
{
    private readonly ApplicationDbContext _context;

    public PatientRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Patient>> GetAllAsync()
    {
        return await _context.Patients
            .Include(p => p.Department)
            .OrderByDescending(p => p.CriticalityScore)
            .ToListAsync();
    }

    public async Task<Patient?> GetByIdAsync(Guid id)
    {
        return await _context.Patients
            .Include(p => p.Department)
            .SingleOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddAsync(Patient patient)
    {
        await _context.Patients.AddAsync(patient);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }



}
