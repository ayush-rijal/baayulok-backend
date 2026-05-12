using BaayuLok.Application.DTOs.Auth;
using BaayuLok.Application.UseCases.Auth.Register;
using BaayuLok.Application.UseCases.Auth.Login;

using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BaayuLok.Api.Controllers;

[ApiController]
[Route("api/[controller]")] // This means the URL will be /api/auth
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")] // This means the URL is /api/auth/register
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // 1. Map the incoming JSON (DTO) to our MediatR Command
        var command = new RegisterUserCommand
        {
            Email = request.Email,
            Password = request.Password,
            FullName = request.FullName,
            Phone = request.Phone
        };

        // 2. Send it to MediatR (This triggers the Handler we wrote earlier!)
        var userId = await _mediator.Send(command);

        // 3. Return a 200 OK with the new User's ID
        return Ok(new { UserId = userId });
    }
[HttpPost("login")]
public async Task<IActionResult> Login ([FromBody] LoginRequest request){
    var command =new LoginUserCommand{
        Email=request.Email,
        Password=request.Password
    };

    var response = await _mediator.Send(command);
    return Ok(response);
}


    
}
