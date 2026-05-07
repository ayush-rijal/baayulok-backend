using BaayuLok.Domain.Enums;

namespace BaayuLok.Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    
    // Default role is Donor as per architecture
    public UserRole Role { get; set; } = UserRole.Donor; 
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
