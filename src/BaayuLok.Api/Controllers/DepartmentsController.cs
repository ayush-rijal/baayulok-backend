using BaayuLok.Application.UseCases.Departments.GetAllDepartments;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BaayuLok.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public DepartmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await _mediator.Send(new GetAllDepartmentsQuery());
        return Ok(departments);
    }
}
