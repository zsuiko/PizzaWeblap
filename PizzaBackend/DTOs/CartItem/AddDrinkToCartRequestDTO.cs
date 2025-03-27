namespace PizzaBackend.DTOs.CartItem
{
    public class AddDrinkToCartRequestDTO
    {
        public string UserId { get; set; }
        public int DrinkId { get; set; }
        public int Quantity { get; set; }
    }
}