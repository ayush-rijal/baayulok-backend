using BaayuLok.Application.Interfaces;
using BaayuLok.Domain.Entities;
using MediatR;

namespace BaayuLok.Application.UseCases.Auth.Register;

// 1. The Command (The Data we receive)
// IRequest<Guid> means this command will return a Guid (the new User ID) when finished
public class RegisterUserCommand : IRequest<Guid>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}

// 2. The Handler (The Business Logic)
public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Guid>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    // Dependency Injection gives us our Repository and Hasher
    public RegisterUserCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Guid> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        // Rule 1: Check if the email is already taken
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new Exception("Email is already registered."); // We will make this error prettier later
        }

        // Rule 2: Create the User entity and hash the password
        var user = new User
        {
            Email = request.Email,
            FullName = request.FullName,
            Phone = request.Phone,
            PasswordHash = _passwordHasher.Hash(request.Password)
        };

        // Rule 3: Save to the database
        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        // Return the new User's ID
        return user.Id;
    }
}
