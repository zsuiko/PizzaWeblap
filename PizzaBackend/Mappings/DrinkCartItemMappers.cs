using PizzaBackend.DTOs.CartItem;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class DrinkCartItemMappers
    {
        public static DrinkCartItemDTO ToDrinkCartItemDTO(this DrinkCartItem drinkCartItemModel)
        {
            return new DrinkCartItemDTO
            {
                DrinkCartItemId = drinkCartItemModel.DrinkCartItemId,
                DrinkId = drinkCartItemModel.DrinkId,
                Quantity = drinkCartItemModel.Quantity,
                Price = drinkCartItemModel.Price,
            };
        }
    }
}