namespace PizzaBackend.DTOs
{
    public class CreateCartDto //POST
    {
        public int OrderId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class CartDto //GET
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public PizzaDto? Pizza { get; set; } // Tartalmazhatja a Pizza részleteit
    }
}
