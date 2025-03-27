using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs.Order;
using PizzaBackend.Mappings;
using PizzaBackend.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static PizzaBackend.Models.Order;

namespace PizzaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public OrderController(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        // GET: api/Order
        [HttpGet]
        public async Task<IActionResult> GetUserOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var orders = _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Pizza)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Drink)
                .Select(o => o.ToOrderDTO())
                .ToListAsync();
                

            return Ok(orders);
        }

        // GET: api/Order/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Pizza)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Drink)
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
                return NotFound();

            
            if (order.UserId != userId)
                return Forbid();

            return Ok(order.ToOrderDTO());
        }

        // POST: api/Order
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequestDTO orderDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return Unauthorized();

            // Aktív kosár lekérdezése
            var cart = await _context.Carts
                .Include(c => c.PizzaCartItems)
                    .ThenInclude(pci => pci.Pizza)
                .Include(c => c.DrinkCartItems)
                    .ThenInclude(dci => dci.Drink)
                .FirstOrDefaultAsync(c => c.UserId == userId && c.IsActive);

            if (cart == null)
                return BadRequest("No active cart found");

            if (!cart.PizzaCartItems.Any() && !cart.DrinkCartItems.Any())
                return BadRequest("Cart is empty");

            // Szállítási cím összeállítása
            string deliveryAddress = string.IsNullOrEmpty(orderDTO.DeliveryAddress) ?
                $"{user.PostalCode}, {user.City}, {user.Address}" :
                orderDTO.DeliveryAddress;

            if (string.IsNullOrWhiteSpace(deliveryAddress))
                return BadRequest("Delivery address is required");

            // Rendelés létrehozása
            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                Status = OrderStatus.Processing,
                DeliveryAddress = deliveryAddress,
                OrderItems = cart.PizzaCartItems.Select(pci => new OrderItem
                {
                    PizzaId = pci.PizzaId,
                    Quantity = pci.Quantity,
                    Price = pci.Price
                }).Concat(cart.DrinkCartItems.Select(dci => new OrderItem
                {
                    DrinkId = dci.DrinkId,
                    Quantity = dci.Quantity,
                    Price = dci.Price
                })).ToList(),
                TotalAmount = cart.PizzaCartItems.Sum(pci => pci.Price * pci.Quantity) +
                              cart.DrinkCartItems.Sum(dci => dci.Price * dci.Quantity)
            };

            _context.Orders.Add(order);
            cart.IsActive = false;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order.ToOrderDTO());
        }

        // PUT: api/Order/{id}/status
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusDTO statusDTO)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound("Order not found");
            

            // Ellenőrizzük, hogy az új állapot érvényes-e
            if (!Enum.IsDefined(typeof(Order.OrderStatus), statusDTO.Status))
                return BadRequest("Invalid status");
            

            // Állapot frissítése
            order.Status = statusDTO.Status;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("history")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Pizza)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Drink)
                .Include(o => o.Payment)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => o.ToOrderDTO())
                .ToListAsync();

            return Ok(orders);
        }
    }
}