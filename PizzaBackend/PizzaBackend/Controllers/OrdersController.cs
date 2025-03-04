using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs;
using PizzaBackend.Extensions;
using PizzaBackend.Models;

namespace PizzaBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.CartItems)
                .ThenInclude(c => c.Pizza)
                .ToListAsync();

            return Ok(orders.Select(o => o.ToDto()));
        }

        // GET: api/orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            var order = await _context.Orders
                .Include(o => o.CartItems)
                .ThenInclude(c => c.Pizza)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return NotFound(new { message = "Order not found" });

            return Ok(order.ToDto());
        }

        // POST: api/orders
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var user = await _context.Users.FindAsync(createOrderDto.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "A felhasználó nem található az adatbázisban!" });
            }

            var order = new Order
            {
                UserId = createOrderDto.UserId,
                Status = OrderStatus.Pending,
                TotalPrice = 0,
                OrderCreatedAt = DateTime.UtcNow,
                CartItems = new List<Cart>()
            };

            foreach (var cartItemDto in createOrderDto.CartItems)
            {
                var pizza = await _context.Pizzas.FindAsync(cartItemDto.PizzaId);
                if (pizza == null)
                {
                    return BadRequest(new { message = $"A pizza ID {cartItemDto.PizzaId} nem található az adatbázisban!" });
                }

                var cartItem = new Cart
                {
                    UserId = createOrderDto.UserId,
                    PizzaId = cartItemDto.PizzaId,
                    Quantity = cartItemDto.Quantity,
                    UnitPrice = pizza.PizzaPrice
                };

                order.CartItems.Add(cartItem);
                order.TotalPrice += cartItem.Quantity * cartItem.UnitPrice;
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order.ToDto());
        }

        // POST: Kosár véglegesítése, rendelés leadása (Checkout)
        [HttpPost("checkout")]
        public async Task<ActionResult<OrderDto>> Checkout([FromQuery] int userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.Pizza)
                .ToListAsync();

            if (!cartItems.Any())
            {
                return BadRequest(new { message = "A kosár üres, nem lehet leadni a rendelést!" });
            }

            var order = new Order
            {
                UserId = userId,
                Status = OrderStatus.Pending,
                TotalPrice = cartItems.Sum(c => c.Quantity * c.UnitPrice),
                OrderCreatedAt = DateTime.UtcNow,
                CartItems = new List<Cart>()
            };

            foreach (var cartItem in cartItems)
            {
                order.CartItems.Add(new Cart
                {
                    UserId = cartItem.UserId,
                    PizzaId = cartItem.PizzaId,
                    Quantity = cartItem.Quantity,
                    UnitPrice = cartItem.UnitPrice
                });
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            _context.Carts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok(new { message = "A rendelés sikeresen leadva!", orderId = order.Id });
        }





        // PUT: api/orders/5 (rendelés státuszának módosítása)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, OrderDto orderDto)
        {
            if (id != orderDto.Id) return BadRequest(new { message = "ID mismatch" });

            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound(new { message = "Order not found" });

            if (Enum.TryParse(orderDto.Status, out OrderStatus newStatus))
            {
                order.Status = newStatus;
            }
            else
            {
                return BadRequest(new { message = "Invalid order status" });
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound(new { message = "Order not found" });

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
