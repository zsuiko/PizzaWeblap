using System;
using System.ComponentModel.DataAnnotations;

namespace PizzaBackend.Models
{
    public class Pizza
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string PizzaName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string PizzaDescription { get; set; } = string.Empty;

        [Required]
        [Range(0, 9999)]
        public int PizzaPrice { get; set; }

        [Required]
        public string PizzaImgUrl { get; set; } = string.Empty;

        [Required]
        public DateTime PizzaCreatedDate { get; set; } = DateTime.UtcNow;
    }
}
