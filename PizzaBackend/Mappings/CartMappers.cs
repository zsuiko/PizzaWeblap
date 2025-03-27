using PizzaBackend.DTOs.Cart;
using PizzaBackend.DTOs.CartItem;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class CartMappers
    {
        public static CartDTO ToCartDTO(this Cart cartModel)
        {
            return new CartDTO
            {
                CartId = cartModel.CartId,
                UserId = cartModel.UserId,
                IsActive = cartModel.IsActive,
                PizzaCartItems = cartModel.PizzaCartItems.Select(p => p.ToPizzaCartItemDTO()).ToList(),
                DrinkCartItems = cartModel.DrinkCartItems.Select(d => d.ToDrinkCartItemDTO()).ToList(),
            };
        }
    }
}