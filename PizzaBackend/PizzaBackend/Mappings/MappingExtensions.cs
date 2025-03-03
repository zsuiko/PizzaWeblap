using PizzaBackend.DTOs;
using PizzaBackend.Models;

namespace PizzaBackend.Extensions
{
    public static class MappingExtensions
    {   

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

         public static CartDto ToDto(this Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                PizzaId = cart.PizzaId,
                Quantity = cart.Quantity,
                Pizza = cart.Pizza?.ToDto()
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
                CartItems = order.CartItems.Select(c => new CartItemDto
                {
                    PizzaId = c.PizzaId,
                    PizzaName = c.Pizza?.PizzaName ?? "Ismeretlen",
                    Quantity = c.Quantity,
                    UnitPrice = c.UnitPrice
                }).ToList()
            };
        }


        

    }
}
