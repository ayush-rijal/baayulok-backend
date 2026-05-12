using BaayuLok.Application.DTOs.Departments;
using BaayuLok.Application.Interfaces;
using MediatR;

namespace BaayuLok.Application.UseCases.Departments.GetAllDepartments;

public class GetAllDepartmentsQuery : IRequest<List<DepartmentDto>>
{
}

public class GetAllDepartmentsQueryHandler : IRequestHandler<GetAllDepartmentsQuery, List<DepartmentDto>>
{
    private readonly IDepartmentRepository _departmentRepository;

    public GetAllDepartmentsQueryHandler(IDepartmentRepository departmentRepository)
    {
        _departmentRepository = departmentRepository;
    }

    public async Task<List<DepartmentDto>> Handle(GetAllDepartmentsQuery request, CancellationToken cancellationToken)
    {
        var departments = await _departmentRepository.GetAllAsync();

        return departments
            .Select(d => new DepartmentDto
            {
                Id = d.Id,
                Name = d.Name,
                Icon = d.Icon
            })
            .ToList();
    }
}
