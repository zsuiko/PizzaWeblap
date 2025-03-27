using PizzaBackend.DTOs.OrderItem;
using PizzaBackend.Models;
using System.Drawing;
using static PizzaBackend.Models.Order;

namespace PizzaBackend.DTOs.Order
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public string UserId { get; set; }
        public string DeliveryAddress { get; set; }
        public OrderStatus Status { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();

    }
}
