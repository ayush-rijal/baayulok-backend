using BaayuLok.Domain.Entities;

namespace BaayuLok.Application.Interfaces;

public interface IDepartmentRepository
{
    Task<List<Department>> GetAllAsync();
}
