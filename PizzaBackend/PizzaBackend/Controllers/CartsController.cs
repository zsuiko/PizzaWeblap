using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs;
using PizzaBackend.Extensions;
using PizzaBackend.Models;

namespace PizzaBackend.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cart/{userId}
        [HttpGet] // 🔥 Itt NEM kell {userId}, hanem query paramétert használunk!
        public async Task<ActionResult<IEnumerable<CartDto>>> GetUserCart([FromQuery] int userId)
        {
            var cartItems = await _context.Carts
                .Include(c => c.Pizza)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (!cartItems.Any())
            {
                return NotFound(new { message = "A kosár üres vagy a felhasználó nem létezik!" });
            }

            return Ok(cartItems.Select(c => c.ToDto()));
        }

        // POST: api/cart (Új pizza hozzáadása a kosárhoz)
        [HttpPost]
        public async Task<ActionResult<CartDto>> AddToCart(CreateCartDto createCartDto)
        {
            if (createCartDto.UserId == 0 || createCartDto.PizzaId == 0)
            {
                return BadRequest(new { message = "Hiányzó felhasználó- vagy pizzaazonosító!" });
            }

            var user = await _context.Users.FindAsync(createCartDto.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "A felhasználó nem található az adatbázisban!" });
            }

            var pizza = await _context.Pizzas.FindAsync(createCartDto.PizzaId);
            if (pizza == null)
            {
                return BadRequest(new { message = "A pizza nem található az adatbázisban!" });
            }

            var existingCartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == createCartDto.UserId && c.PizzaId == createCartDto.PizzaId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += createCartDto.Quantity;
            }
            else
            {
                var newCartItem = new Cart
                {
                    UserId = createCartDto.UserId,
                    PizzaId = createCartDto.PizzaId,
                    Quantity = createCartDto.Quantity,
                    UnitPrice = pizza.PizzaPrice
                };

                _context.Carts.Add(newCartItem);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "A pizza sikeresen hozzáadva a kosárhoz!" });
        }






        // DELETE: api/cart/{id} (Elem eltávolítása a kosárból)
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.Carts.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
