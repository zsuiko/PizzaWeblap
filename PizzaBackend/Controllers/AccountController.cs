using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs.Account;
using PizzaBackend.Interfaces;
using PizzaBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace PizzaBackend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;
        private readonly AppDbContext _context;
        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signinmanager, AppDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signinmanager;
            _context = context;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email.ToLower());

            if (user == null)
                return Unauthorized("Invalid Email!");


            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Email not found or password incorrect!");

            var oldTokens = _context.RefreshTokens.Where(x => x.UserId == user.Id);

            _context.RefreshTokens.RemoveRange(oldTokens);

            var token = _tokenService.CreateToken(user);
            var refreshToken = _tokenService.CreateRefreshToken();

            _context.RefreshTokens.Add(new RefreshToken
            {
                UserId = user.Id,
                Token = refreshToken,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            await _context.SaveChangesAsync();

            return Ok(
                new AuthResponseDTO
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    Email = user.Email,
                    TokenExpiration = DateTime.Now.AddMinutes(15)
                });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDTO request)
        {
            if (string.IsNullOrEmpty(request.Token) || string.IsNullOrEmpty(request.RefreshToken))
                return BadRequest("Invalid Token!");

            var principal = _tokenService.GetPrincipalFromExpiredToken(request.Token);

            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest("Invalid Token!");

            var storedRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == request.RefreshToken && x.UserId == userId);

            if (storedRefreshToken == null || storedRefreshToken.IsExpired || !storedRefreshToken.IsActive)
                return BadRequest("Invalid Refresh Token!");

            var newToken = _tokenService.CreateToken(user);
            var newRefreshToken = _tokenService.CreateRefreshToken();

            _context.RefreshTokens.Remove(storedRefreshToken);

            _context.RefreshTokens.Add(new RefreshToken
            {
                UserId = user.Id,
                Token = newRefreshToken,
                Expires = DateTime.UtcNow.AddDays(7)
            });
            await _context.SaveChangesAsync();

            return Ok(new AuthResponseDTO
            {
                Token = newToken,
                RefreshToken = newRefreshToken,
                Email = user.Email,
                TokenExpiration = DateTime.Now.AddMinutes(15)
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO RegisterDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new User
                {
                    UserName = RegisterDTO.Email,
                    Email = RegisterDTO.Email,
                    FirstName = RegisterDTO.FirstName,
                    LastName = RegisterDTO.LastName,
                    PhoneNumber = RegisterDTO.PhoneNumber,
                    Address = RegisterDTO.Address,
                    City = RegisterDTO.City,
                    PostalCode = RegisterDTO.PostalCode

                };

                var createUser = await _userManager.CreateAsync(user, RegisterDTO.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDTO
                            {
                                
                                Email = user.Email,
                                Token = _tokenService.CreateToken(user),
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                            }
                            );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
