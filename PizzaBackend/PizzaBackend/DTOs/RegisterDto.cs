using PizzaBackend.Models;

namespace PizzaBackend.DTOs
{
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty; 
        public Role Role{ get; set; }
    }
}
