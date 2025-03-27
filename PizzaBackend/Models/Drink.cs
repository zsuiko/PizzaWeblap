using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace PizzaBackend.Models
{
    public class Drink
    {
        [Key]
        public int DrinkId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public DrinkCategories Category { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public ICollection<DrinkCartItem> DrinkCartItems { get; set; } = new List<DrinkCartItem>();
    }

    public enum DrinkCategories
    {
        Szénsavas,
        Szénsavmentes
    }
}