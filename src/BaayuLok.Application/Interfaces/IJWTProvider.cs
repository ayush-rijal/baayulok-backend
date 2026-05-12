using BaayuLok.Domain.Entities;

namespace BaayuLok.Application.Interfaces;

public interface IJwtProvider
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}
