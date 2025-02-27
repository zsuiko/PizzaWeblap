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
        [HttpPost]
        public async Task<ActionResult<OrderDto>> PostOrder(CreateOrderDto createOrderDto)
        {
            var user = await _context.Users.FindAsync(createOrderDto.UserId);
            if (user == null) return BadRequest(new { message = "User not found" });

            var order = new Order
            {
                UserId = createOrderDto.UserId,
                Status = OrderStatus.Pending,
                CartItems = new List<Cart>()
            };

            foreach (var cartDto in createOrderDto.CartItems)
            {
                var pizza = await _context.Pizzas.FindAsync(cartDto.PizzaId);
                if (pizza == null) return BadRequest(new { message = $"Pizza with ID {cartDto.PizzaId} not found" });

                order.CartItems.Add(new Cart
                {
                    Order = order,
                    Pizza = pizza,
                    PizzaId = cartDto.PizzaId,
                    Quantity = cartDto.Quantity,
                    UnitPrice = pizza.PizzaPrice
                });
            }

            order.TotalPrice = (int)order.CartItems.Sum(c => c.Quantity * c.UnitPrice);

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order.ToDto());
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
