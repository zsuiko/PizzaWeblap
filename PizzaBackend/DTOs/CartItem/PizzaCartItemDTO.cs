namespace PizzaBackend.DTOs.CartItem
{
    public class PizzaCartItemDTO
    {
        public int PizzaCartItemId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice => Price * Quantity;
    }
}