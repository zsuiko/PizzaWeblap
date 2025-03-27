namespace PizzaBackend.DTOs.CartItem
{
    public class AddPizzaToCartRequestDTO
    {
        public string UserId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
    }
}