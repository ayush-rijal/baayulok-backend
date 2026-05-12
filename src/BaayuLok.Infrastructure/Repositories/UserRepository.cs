using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BaayuLok.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        // Searches the database for a matching email
        return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
    }

    public async Task AddAsync(User user)
    {
        // Adds the new user to the database tracking
        await _context.Users.AddAsync(user);
    }

    public async Task SaveChangesAsync()
    {
        // Actually executes the SQL to save to PostgreSQL
        await _context.SaveChangesAsync();
    }
}
