namespace PizzaBackend.DTOs.Payment
{
    public class PaymentDTO
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Status { get; set; } // Fizetés állapota
        public string PaymentMethod { get; set; }
        public string TransactionId { get; set; }
    }
}