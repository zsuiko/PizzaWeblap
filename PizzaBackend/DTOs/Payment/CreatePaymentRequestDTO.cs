﻿namespace PizzaBackend.DTOs.Payment
{
    public class CreatePaymentRequestDTO
    {
        public int OrderId { get; set; }
        public string PaymentMethod { get; set; } // Pl. "CreditCard", "PayPal"
        public string TransactionId { get; set; } // Tranzakció azonosító
    }
}