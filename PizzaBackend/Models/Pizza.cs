using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace PizzaBackend.Models
{
    public class Pizza
    {
        [Key]
        public int PizzaId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public Sizes Size { get; set; }
        public PizzaCategories Category { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public decimal Price { get; set; } 
        public bool IsAvailable { get; set; } = true;

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public ICollection<PizzaCartItem> PizzaCartItems { get; set; } = new List<PizzaCartItem>(); 

    }
       public enum Sizes
       {
            Kicsi,
            Közepes,
            Nagy
       }

       public enum PizzaCategories
       {
            Vegetáriánus,
            Vegan,
            Húsos,
            Tengeri,
            Gluténmentes,
            Fitness
       }
}
