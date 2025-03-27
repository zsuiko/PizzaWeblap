using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs.Cart;
using PizzaBackend.DTOs.CartItem;
using PizzaBackend.Mappings;
using PizzaBackend.Models;
using System.Linq;

namespace PizzaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public IActionResult GetAll()
        {
            var carts = _context.Carts
                .Include(c => c.PizzaCartItems)
                .ThenInclude(p => p.Pizza)
                .Include(c => c.DrinkCartItems)
                .ThenInclude(d => d.Drink)
                .ToList()
                .Select(c => c.ToCartDTO());

            return Ok(carts);
        }

        // GET: api/Cart/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var cart = _context.Carts
                .Include(c => c.PizzaCartItems)
                .ThenInclude(p => p.Pizza)
                .Include(c => c.DrinkCartItems)
                .ThenInclude(d => d.Drink)
                .FirstOrDefault(c => c.CartId == id);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart.ToCartDTO());
        }

        // POST: api/Cart/add-pizza
        [HttpPost("add-pizza")]
        public IActionResult AddPizzaToCart([FromBody] AddPizzaToCartRequestDTO request)
        {
            var pizza = _context.Pizzas.FirstOrDefault(p => p.PizzaId == request.PizzaId);
            if (pizza == null)
            {
                return NotFound($"Pizza with ID {request.PizzaId} not found");
            }

            if (request.Quantity <= 0)
            {
                return BadRequest("Quantity must be greater than 0");
            }

            var cart = _context.Carts
                .Include(c => c.PizzaCartItems)
                .FirstOrDefault(c => c.UserId == request.UserId && c.IsActive);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = request.UserId,
                    IsActive = true
                };
                _context.Carts.Add(cart);
                _context.SaveChanges();
            }

            var pizzaCartItemModel = new PizzaCartItem
            {
                CartId = cart.CartId,
                PizzaId = request.PizzaId,
                Quantity = request.Quantity,
                Price = pizza.Price,
            };

            _context.PizzaCartItems.Add(pizzaCartItemModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = pizzaCartItemModel.PizzaCartItemId }, pizzaCartItemModel.ToPizzaCartItemDTO());
        }

        // POST: api/Cart/add-drink
        [HttpPost("add-drink")]
        public IActionResult AddDrinkToCart([FromBody] AddDrinkToCartRequestDTO request)
        {
            var drink = _context.Drinks.FirstOrDefault(d => d.DrinkId == request.DrinkId);
            if (drink == null)
            {
                return NotFound($"Drink with ID {request.DrinkId} not found");
            }

            if (!drink.IsAvailable)
            {
                return BadRequest($"Drink with ID {request.DrinkId} is not available");
            }

            if (request.Quantity <= 0)
            {
                return BadRequest("Quantity must be greater than 0");
            }

            var cart = _context.Carts
                .Include(c => c.DrinkCartItems)
                .FirstOrDefault(c => c.UserId == request.UserId && c.IsActive);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = request.UserId,
                    IsActive = true
                };
                _context.Carts.Add(cart);
                _context.SaveChanges();
            }

            var drinkCartItemModel = new DrinkCartItem
            {
                CartId = cart.CartId,
                DrinkId = request.DrinkId,
                Quantity = request.Quantity,
                Price = drink.Price,
            };

            _context.DrinkCartItems.Add(drinkCartItemModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = drinkCartItemModel.DrinkCartItemId }, drinkCartItemModel.ToDrinkCartItemDTO());
        }
    }
}