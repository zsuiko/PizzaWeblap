using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using PizzaBackend.DTOs.Drink;
using PizzaBackend.DTOs.Products;
using PizzaBackend.Mappings;
using PizzaBackend.Models;
using System.Collections.Generic;
using System.Linq;

namespace PizzaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DrinkController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/drink
        [HttpGet]
        public IActionResult GetAll()
        {
            var drinks = _context.Drinks.ToList()
                .Select(s => s.ToDrinkDTO());

            return Ok(drinks);
        }

        // GET: api/drink/{id}
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var drink = _context.Drinks.Find(id);

            if (drink == null)
            {
                return NotFound();
            }

            return Ok(drink.ToDrinkDTO());
        }

        // POST: api/drink
        [HttpPost]
        public IActionResult Create([FromBody] CreateDrinkRequestDTO drinkDTO)
        {
            var drinkModel = drinkDTO.ToDrinkFromCreateDTO();
            _context.Drinks.Add(drinkModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = drinkModel.DrinkId }, drinkModel.ToDrinkDTO());
        }

        // PUT: api/drink/{id}
        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateDrinkRequestDTO updateDTO)
        {
            var drinkModel = _context.Drinks.FirstOrDefault(d => d.DrinkId == id);

            if (drinkModel == null)
            {
                return NotFound();
            }

            drinkModel.Name = updateDTO.Name;
            drinkModel.Description = updateDTO.Description;
            drinkModel.Category = updateDTO.Category;
            drinkModel.ImageUrl = updateDTO.ImageUrl;
            drinkModel.Price = updateDTO.Price;
            drinkModel.IsAvailable = updateDTO.IsAvailable;

            _context.SaveChanges();

            return Ok(drinkModel.ToDrinkDTO());
        }

        // PUT: api/drink/{id}/availability
        [HttpPut("{id}/availability")]
        public IActionResult UpdateIsAvailable([FromRoute] int id, [FromBody] UpdateDrinkIsAvailableRequestDTO updateDTO)
        {
            var drinkModel = _context.Drinks.FirstOrDefault(d => d.DrinkId == id);

            if (drinkModel == null)
            {
                return NotFound();
            }

            drinkModel.IsAvailable = updateDTO.IsAvailable;

            _context.SaveChanges();

            return Ok(drinkModel.ToDrinkDTO());
        }

        // DELETE: api/drink/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var drinkModel = _context.Drinks.FirstOrDefault(d => d.DrinkId == id);

            if (drinkModel == null)
            {
                return NotFound();
            }

            _context.Drinks.Remove(drinkModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}