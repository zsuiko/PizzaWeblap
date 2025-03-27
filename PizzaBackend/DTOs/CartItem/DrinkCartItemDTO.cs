namespace PizzaBackend.DTOs.CartItem
{
    public class DrinkCartItemDTO
    {
        public int DrinkCartItemId { get; set; }
        public int DrinkId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice => Price * Quantity;
    }
}