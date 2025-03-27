using System.Drawing;

namespace PizzaBackend.DTOs.Account
{
    public class NewUserDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
