namespace PizzaBackend.DTOs
{
    public class CreateOrderDto // POST
    {
        public int UserId { get; set; }
        public List<CreateCartItemDto> CartItems { get; set; } = new();
    }

    public class CreateCartItemDto
    {
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } // Pl. "Pending"
        public int TotalPrice { get; set; }
        public DateTime OrderCreatedAt { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new();       
    }

    public class CartItemDto
    {
        public int PizzaId { get; set; }
        public string PizzaName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
