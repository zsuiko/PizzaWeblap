using PizzaBackend.Models;

namespace PizzaBackend.DTOs.Pizza
{
    public class UpdatePizzaRequestDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Sizes Size { get; set; }
        public PizzaCategories Category { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}
