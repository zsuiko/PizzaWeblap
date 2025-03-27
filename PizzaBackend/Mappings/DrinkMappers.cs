using PizzaBackend.DTOs.Drink;
using PizzaBackend.DTOs.Products;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class DrinkMappers
    {
        public static DrinkDTO ToDrinkDTO(this Drink drinkModel)
        {
            return new DrinkDTO
            {
                DrinkId = drinkModel.DrinkId,
                Name = drinkModel.Name,
                Description = drinkModel.Description,
                Category = drinkModel.Category,
                ImageUrl = drinkModel.ImageUrl,
                Price = drinkModel.Price,
                IsAvailable = drinkModel.IsAvailable
            };
        }

        public static Drink ToDrinkFromCreateDTO(this CreateDrinkRequestDTO drinkDTO)
        {
            return new Drink
            {
                Name = drinkDTO.Name,
                Description = drinkDTO.Description,
                Category = drinkDTO.Category,
                ImageUrl = drinkDTO.ImageUrl,
                Price = drinkDTO.Price,
                IsAvailable = drinkDTO.IsAvailable
            };
        }
    }
}