using System.Text.Json.Serialization;

namespace PizzaBackend.DTOs.OrderItem
{
    public class OrderItemDTO
    {
        public int OrderItemId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? PizzaId { get; set; } // Csak akkor jelenik meg, ha nem null

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? DrinkId { get; set; } // Csak akkor jelenik meg, ha nem null

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice => Price * Quantity;
    }
}