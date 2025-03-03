namespace PizzaBackend.DTOs
{
    public class CartDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public PizzaDto? Pizza { get; set; } // A pizza adatai
    }

    public class CreateCartDto
    {
        
        public int UserId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
    }
}
