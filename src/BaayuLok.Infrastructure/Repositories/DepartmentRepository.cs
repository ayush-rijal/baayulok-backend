using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using BaayuLok.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BaayuLok.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly ApplicationDbContext _context;

    public DepartmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Department>> GetAllAsync()
    {
        return await _context.Departments
            .OrderBy(d => d.Name)
            .ToListAsync();
    }
}
