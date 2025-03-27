using PizzaBackend.DTOs.OrderItem;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class OrderItemMappers
    {
        public static OrderItemDTO ToOrderItemDTO(this OrderItem orderItemModel)
        {
            return new OrderItemDTO
            {
                OrderItemId = orderItemModel.OrderItemId,
                PizzaId = orderItemModel.PizzaId,
                DrinkId = orderItemModel.DrinkId,
                Quantity = orderItemModel.Quantity,
                Price = orderItemModel.Price,
            };
        }

        public static OrderItem ToOrderItemFromCreateDTO(this CreateOrderItemRequestDTO orderItemDTO)
        {
            return new OrderItem
            {
                PizzaId = orderItemDTO.PizzaId,
                DrinkId = orderItemDTO.DrinkId,
                Quantity = orderItemDTO.Quantity,
            };
        }
    }
}