using System;
using System.ComponentModel.DataAnnotations;

namespace PizzaBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string UserEmail { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty ;

        [Required]
        [MaxLength(300)]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public Role Role { get; set; } = Role.Customer;

        [Required]
        public DateTime RegisteredDate { get; set; } = DateTime.UtcNow;
    }

    public enum Role
    {
        Customer = 0, // Normál felhasználó
        Admin = 1     // Admin jogok
    }
}
