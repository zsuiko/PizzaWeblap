using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaBackend.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int pizzaId { get; set; }
        [ForeignKey("pizzaId")]
        public Pizza Pizza { get; set; } 
        public int userId { get; set; }
        [ForeignKey("userId")]
        public User User { get; set; } 
        public int Rating { get; set; } 
        public string Comment { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
    }


    
}
