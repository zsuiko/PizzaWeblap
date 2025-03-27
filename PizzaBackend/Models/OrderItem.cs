using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PizzaBackend.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }


        public int OrderId { get; set; }
        public int? PizzaId { get; set; }
        public int? DrinkId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }


        public Order Order { get; set; }
        public Pizza Pizza { get; set; }
        public Drink Drink { get; set; }
    }
}
