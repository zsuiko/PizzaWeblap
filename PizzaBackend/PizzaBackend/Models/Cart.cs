using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaBackend.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PizzaId { get; set; }

        [Required]
        public int UserId {get; set;}

        [Required]
        [Range(1, 50)]
        public int Quantity { get; set; } = 1;

        [Required]
        [Range(1, double.MaxValue)]
        public int UnitPrice { get; set; } // Az adott pizza ára a rendeléskor  

        [ForeignKey("PizzaId")]
        public Pizza? Pizza { get; set; }

        [ForeignKey("UserId")]
        public User? User {get; set;}
    }
}

