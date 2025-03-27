namespace PizzaBackend.DTOs.CartItem
{
    public class CreateCartItemRequestDTO
    {
        public string UserId { get; set; }
        public int? PizzaId { get; set; }
        public int? DrinkId { get; set; }
        public int Quantity { get; set; }
        
    }
}
