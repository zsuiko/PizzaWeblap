namespace PizzaBackend.DTOs.OrderItem
{
    public class CreateOrderItemRequestDTO
    {
        public int? PizzaId { get; set; }
        public int? DrinkId { get; set; }
        public int Quantity { get; set; }
        
    }
}