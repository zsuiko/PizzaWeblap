using PizzaBackend.DTOs;
using PizzaBackend.Models;
using System.Linq;

namespace PizzaBackend.Extensions
{
    public static class MappingExtensions
    {
        public static CartItemDto ToDto(this Cart cart)
        {
            return new CartItemDto
            {
                PizzaId = cart.PizzaId,
                PizzaName = cart.Pizza?.PizzaName ?? "Unknown Pizza",
                Quantity = cart.Quantity,
                UnitPrice = cart.UnitPrice
            };
        }

        public static PizzaDto ToDto(this Pizza pizza)
        {
            return new PizzaDto
            {
                Id = pizza.Id,
                PizzaName = pizza.PizzaName,
                PizzaDescription = pizza.PizzaDescription,
                PizzaPrice = pizza.PizzaPrice,
                PizzaImgUrl = pizza.PizzaImgUrl
            };
        }

        public static OrderDto ToDto(this Order order)
        {
            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                Status = order.Status.ToString(),
                TotalPrice = order.TotalPrice,
                OrderCreatedAt = order.OrderCreatedAt,
                CartItems = order.CartItems.Select(c => c.ToDto()).ToList()
            };
        }

        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                UserEmail = user.UserEmail,
                Address = user.Address,
                Role = (int)user.Role
            };
        }
    }
}
