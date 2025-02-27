namespace PizzaBackend.DTOs
{





    public class CreateOrderDto //POST
    {
        public int UserId { get; set; }

        public List<CreateCartItemDto> CartItems { get; set; } = new();
    }

    public class CreateCartItemDto
    {
        public int PizzaId { get; set; } // Milyen pizzát rendel?
        public int Quantity { get; set; } // Hány darabot rendel?
        public decimal UnitPrice { get; set; } // A pizza ára a rendelés pillanatában
    }







    public class OrderDto
    {
         public int Id { get; set; }
         public int UserId { get; set; }
         public string Status { get; set; } // Szöveges formában legyen (pl. "Pending" helyett 0)
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
