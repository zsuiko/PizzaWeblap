using PizzaBackend.DTOs.OrderItem;
using System.Collections.Generic;

namespace PizzaBackend.DTOs.Order
{
    public class CreateOrderRequestDTO
    {
        public int CartId { get; set; }
        public string UserId { get; set; }
        
        public string DeliveryAddress { get; set; }
    }
}