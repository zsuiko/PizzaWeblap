using Microsoft.AspNetCore.Authorization.Infrastructure;
using PizzaBackend.Models;
using System.Security.Claims;

namespace PizzaBackend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
        string CreateRefreshToken();

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
