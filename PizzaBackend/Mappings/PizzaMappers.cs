
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using PizzaBackend.DTOs.Products;
using PizzaBackend.Models;
using PizzaBackend.DTOs;
using PizzaBackend.DTOs.Pizza;

namespace PizzaBackend.Mappings
{
    public static class PizzaMappers
    {
        public static PizzaDTO ToPizzaDTO(this Pizza pizzaModel)
        {
            return new PizzaDTO
            {
                PizzaId = pizzaModel.PizzaId,
                Name = pizzaModel.Name,
                Description = pizzaModel.Description,
                Size = pizzaModel.Size,
                Category = pizzaModel.Category,
                ImageUrl = pizzaModel.ImageUrl,
                Price = pizzaModel.Price,
                IsAvailable = pizzaModel.IsAvailable
            };
        }


        public static Pizza ToPizzaFromCreateDTO(this CreatePizzaRequestDTO PizzaDTO)
        {
            return new Pizza
            {

                Name = PizzaDTO.Name,
                Description = PizzaDTO.Description,
                Size = PizzaDTO.Size,
                Category = PizzaDTO.Category,
                ImageUrl = PizzaDTO.ImageUrl,
                Price = PizzaDTO.Price,
                IsAvailable = PizzaDTO.IsAvailable
            };


        }

    }
}
