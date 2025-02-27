using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaBackend.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        [Required]
        [Range(0, int.MaxValue)]
        public int TotalPrice { get; set; }

        [Required]
        public DateTime OrderCreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public List<Cart> CartItems { get; set; } = new();
    }

    public enum OrderStatus
    {
        Pending, //0
        Preparing, //1
        Completed, //2
        Cancelled //3
    }
}
