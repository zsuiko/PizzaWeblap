using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs.Payment;
using PizzaBackend.Models;
using System;
using System.Threading.Tasks;
using PizzaBackend.Mappings;

namespace PizzaBackend.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/payments
        // POST: api/payments
        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentRequestDTO paymentDTO)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems) // Betöltjük a rendeléshez tartozó tételeket
                .FirstOrDefaultAsync(o => o.OrderId == paymentDTO.OrderId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            // Ellenőrizzük, hogy a rendeléshez tartozó tételek léteznek-e
            if (order.OrderItems == null || !order.OrderItems.Any())
            {
                return BadRequest("Order has no items");
            }

            // Fizetés létrehozása a rendelés teljes összegével
            var payment = new Payment
            {
                OrderId = paymentDTO.OrderId,
                Amount = order.TotalAmount, // A rendelés teljes összege
                PaymentMethod = paymentDTO.PaymentMethod,
                TransactionId = paymentDTO.TransactionId,
                Status = Payment.PaymentStatus.Completed // Feltételezzük, hogy a fizetés sikeres
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPaymentById), new { id = payment.PaymentId }, payment.ToPaymentDTO());
        }

        // GET: api/payments/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            var payment = await _context.Payments
                .Include(p => p.Order)
                .FirstOrDefaultAsync(p => p.PaymentId == id);

            if (payment == null)
            {
                return NotFound("Payment not found");
            }

            return Ok(payment.ToPaymentDTO());
        }
    }
}