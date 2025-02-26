using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaBackend.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public int PizzaId { get; set; }

        [Required]
        [Range(1, 50)]
        public int Quantity { get; set; } = 1;

        [Required]
        [Range(0, double.MaxValue)]
        public decimal UnitPrice { get; set; } // Az adott pizza ára a rendeléskor

        [ForeignKey("OrderId")]
        public Order? Order { get; set; }

        [ForeignKey("PizzaId")]
        public Pizza? Pizza { get; set; }
    }
}
