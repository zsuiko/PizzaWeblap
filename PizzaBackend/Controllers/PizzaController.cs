using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs.Pizza;
using PizzaBackend.DTOs.Products;
using PizzaBackend.Mappings;
using PizzaBackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PizzaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/pizza
        [HttpGet]
        public IActionResult GetAll()
        {
            var pizzas = _context.Pizzas.ToList()
                .Select(s => s.ToPizzaDTO());

            return Ok(pizzas);
        }

        // GET: api/pizza/{id}
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var pizza = _context.Pizzas.Find(id);

            if (pizza == null)
            {
                return NotFound();
            }

            return Ok(pizza.ToPizzaDTO());
        }

        // POST: api/pizza
        [HttpPost]
        public IActionResult Create([FromBody] CreatePizzaRequestDTO PizzaDTO)
        {
            var pizzaModel = PizzaDTO.ToPizzaFromCreateDTO();
            _context.Pizzas.Add(pizzaModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = pizzaModel.PizzaId }, pizzaModel.ToPizzaDTO());
        }


        // PUT: api/pizza/{id}
        [HttpPut]
        [Route("{id}")]

        public IActionResult Update([FromRoute] int id, [FromBody] UpdatePizzaRequestDTO updateDTO)
        {
            var pizzaModel = _context.Pizzas.FirstOrDefault(p => p.PizzaId == id);

            if(pizzaModel == null)
            { 
                return NotFound();
            }

            pizzaModel.Name = updateDTO.Name;
            pizzaModel.Description = updateDTO.Description;
            pizzaModel.Size = updateDTO.Size;
            pizzaModel.Category = updateDTO.Category;
            pizzaModel.ImageUrl = updateDTO.ImageUrl;
            pizzaModel.Price = updateDTO.Price;
            pizzaModel.IsAvailable = updateDTO.IsAvailable;

            _context.SaveChanges();

            return Ok(pizzaModel.ToPizzaDTO());
        }
        
        // PUT: api/pizza/{id}
        [HttpPut]
        [Route("{id}/availability")]

        public IActionResult UpdateIsAvailable([FromRoute] int id, [FromBody] UpdatePizzaIsAvailableRequestDTO updateDTO)
        {
            var pizzaModel = _context.Pizzas.FirstOrDefault(p => p.PizzaId == id);

            if (pizzaModel == null)
            {
                return NotFound();
            }
            pizzaModel.IsAvailable = updateDTO.IsAvailable;

            _context.SaveChanges();

            return Ok(pizzaModel.ToPizzaDTO());
        }


        // DELETE: api/pizza/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var pizzaModel = _context.Pizzas.FirstOrDefault(p => p.PizzaId == id);

            if (pizzaModel == null)
            {
                return NotFound();
            }

            _context.Pizzas.Remove(pizzaModel);

            _context.SaveChanges();

            return NoContent();
        }
            
    }
}
