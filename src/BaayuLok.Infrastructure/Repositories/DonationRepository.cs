using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace BaayuLok.Infrastructure.Repositories;

public class DonationRepository : IDonationRepository
{
    private readonly ApplicationDbContext _context;

    public DonationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Donation donation)
    {
        await _context.Donations.AddAsync(donation);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    public async Task<List<Donation>> GetByPatientIdAsync(Guid patientId){
        return await _context.Donations
        .Where(d=>d.PatientId==patientId)
        .OrderByDescending(d=>d.CreatedAt)
        .ToListAsync();
    }
}
