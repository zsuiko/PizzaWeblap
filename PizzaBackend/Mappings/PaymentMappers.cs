using PizzaBackend.DTOs.Payment;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class PaymentMappers
    {
        public static PaymentDTO ToPaymentDTO(this Payment payment)
        {
            return new PaymentDTO
            {
                PaymentId = payment.PaymentId,
                OrderId = payment.OrderId,
                Amount = payment.Amount,
                PaymentDate = payment.PaymentDate,
                Status = payment.Status.ToString(),
                PaymentMethod = payment.PaymentMethod,
                TransactionId = payment.TransactionId
            };
        }
    }
}