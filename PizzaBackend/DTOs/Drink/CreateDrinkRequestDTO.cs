using PizzaBackend.Models;

namespace PizzaBackend.DTOs.Drink
{
    public class CreateDrinkRequestDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DrinkCategories Category { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}