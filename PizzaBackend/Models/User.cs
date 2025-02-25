using Microsoft.AspNetCore.Identity;

namespace PizzaBackend.Models
{
    public class User
    {
        public int Id { get; set; }


        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Role Role { get; set; } = Role.Customer;
        public DateTime RegisteredDate { get; set; } = DateTime.Now;

    }

    public enum Role
    {
        
        Admin = 0,// Admin - teljes jogosultság
        Customer = 1// Customer - részleges jogosultság


    }
}
