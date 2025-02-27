using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs;
using PizzaBackend.Extensions;
using PizzaBackend.Models;

namespace PizzaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PizzasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Pizzas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PizzaDto>>> GetPizzas()
        {
            var pizzas = await _context.Pizzas.ToListAsync();
            return Ok(pizzas.Select(p => p.ToDto()));
        }

        // GET: api/Pizzas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PizzaDto>> GetPizza(int id)
        {
            var pizza = await _context.Pizzas.FindAsync(id);

            if (pizza == null)
            {
                return NotFound(new { message = "Pizza not found" });
            }

            return Ok(pizza.ToDto());
        }

        // POST: api/Pizzas
        [HttpPost]
        public async Task<ActionResult<PizzaDto>> PostPizza(CreatePizzaDto createPizzaDto)
        {
            var pizza = new Pizza
            {
                PizzaName = createPizzaDto.PizzaName,
                PizzaDescription = createPizzaDto.PizzaDescription,
                PizzaPrice = (int)createPizzaDto.PizzaPrice,
                PizzaImgUrl = createPizzaDto.PizzaImgUrl
            };

            _context.Pizzas.Add(pizza);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPizza), new { id = pizza.Id }, pizza.ToDto());
        }

        // PUT: api/Pizzas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPizza(int id, PizzaDto pizzaDto)
        {
            if (id != pizzaDto.Id)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            var pizza = await _context.Pizzas.FindAsync(id);
            if (pizza == null)
            {
                return NotFound(new { message = "Pizza not found" });
            }

            pizza.PizzaName = pizzaDto.PizzaName;
            pizza.PizzaDescription = pizzaDto.PizzaDescription;
            pizza.PizzaPrice = (int)pizzaDto.PizzaPrice;
            pizza.PizzaImgUrl = pizzaDto.PizzaImgUrl;

            _context.Entry(pizza).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Pizzas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            var pizza = await _context.Pizzas.FindAsync(id);
            if (pizza == null)
            {
                return NotFound(new { message = "Pizza not found" });
            }

            _context.Pizzas.Remove(pizza);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
