namespace PizzaBackend.Models
{
    public class DrinkCartItem
    {
        public int DrinkCartItemId { get; set; }

        public int CartId { get; set; }
        public int DrinkId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }


        public Cart Cart { get; set; }
        public Drink Drink { get; set; }
        

    }
}
