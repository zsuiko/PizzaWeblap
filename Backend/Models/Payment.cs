using System;
using System.ComponentModel.DataAnnotations;

namespace PizzaBackend.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.Now;
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        public string PaymentMethod { get; set; }
        public string TransactionId { get; set; }

        public Order Order { get; set; }

        public enum PaymentStatus
        {
            Pending,   
            Completed,  
            Failed,     
            Refunded    
        }
    }
}