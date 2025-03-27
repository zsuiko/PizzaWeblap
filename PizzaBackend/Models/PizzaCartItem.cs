namespace PizzaBackend.Models
{
    public class PizzaCartItem
    {
        public int PizzaCartItemId { get; set; }

        public int CartId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }


        public Cart Cart { get; set; }
        public Pizza Pizza { get; set; }
        

    }
}
