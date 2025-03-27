using PizzaBackend.DTOs.CartItem;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class PizzaCartItemMappers
    {
        public static PizzaCartItemDTO ToPizzaCartItemDTO(this PizzaCartItem pizzaCartItemModel)
        {
            return new PizzaCartItemDTO
            {
                PizzaCartItemId = pizzaCartItemModel.PizzaCartItemId,
                PizzaId = pizzaCartItemModel.PizzaId,
                Quantity = pizzaCartItemModel.Quantity,
                Price = pizzaCartItemModel.Price,
            };
        }
    }
}