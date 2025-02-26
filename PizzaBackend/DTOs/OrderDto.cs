namespace PizzaBackend.DTOs
{
    public class CreateOrderDto //POST
    {
        public int UserId { get; set; }

        public List<CreateCartDto> CartItems { get; set; } = new();
    }

   
    public class OrderDto
    {
         public int Id { get; set; }
         public int UserId { get; set; }
         public string Status { get; set; } // Szöveges formában legyen (pl. "Pending" helyett 0)
         public int TotalPrice { get; set; }

         public DateTime OrderCreatedAt { get; set; }

         public List<CartDto> CartItems { get; set; } = new();       
    }
    

}
