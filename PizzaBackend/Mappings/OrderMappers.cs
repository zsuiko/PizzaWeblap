using PizzaBackend.DTOs.Order;
using PizzaBackend.DTOs.OrderItem;
using PizzaBackend.Models;

namespace PizzaBackend.Mappings
{
    public static class OrderMappers
    {
        public static OrderDTO ToOrderDTO(this Order orderModel)
        {
            return new OrderDTO
            {
                OrderId = orderModel.OrderId,
                UserId = orderModel.UserId,
                OrderDate = orderModel.OrderDate,
                TotalAmount = orderModel.TotalAmount,
                DeliveryAddress = orderModel.DeliveryAddress,
                Status = orderModel.Status,
                OrderItems = orderModel.OrderItems.Select(oi => oi.ToOrderItemDTO()).ToList(),
            };
        }

        public static Order ToOrderFromCreateDTO(this CreateOrderRequestDTO orderDTO, Cart cart, User user)
        {
            // Összesítjük a pizzákat és italokat
            var orderItems = cart.PizzaCartItems.Select(pci => new OrderItem
            {
                PizzaId = pci.PizzaId,
                DrinkId = null,
                Quantity = pci.Quantity,
                Price = pci.Price,
            }).ToList();

            orderItems.AddRange(cart.DrinkCartItems.Select(dci => new OrderItem
            {
                DrinkId = dci.DrinkId,
                PizzaId = null,
                Quantity = dci.Quantity,
                Price = dci.Price,
            }));

            // Szállítási cím kezelése
            string deliveryAddress;

            if (!string.IsNullOrEmpty(user.Address) && !string.IsNullOrEmpty(user.City) && !string.IsNullOrEmpty(user.PostalCode))
            {
                // Ha a felhasználónak van mentett címe, akkor azt használjuk
                deliveryAddress = $"{user.PostalCode}, {user.City}, {user.Address}";
            }
            else if (!string.IsNullOrEmpty(orderDTO.DeliveryAddress))
            {
                // Ha a felhasználónak nincs mentett címe, de a frontend küldött címet, akkor azt használjuk
                deliveryAddress = orderDTO.DeliveryAddress;
            }
            else
            {
                // Ha nincs cím megadva, akkor hibát dobunk
                throw new InvalidOperationException("A felhasználónak nincs mentett címe, és nem adott meg címet a rendelés során.");
            }

            return new Order
            {
                UserId = orderDTO.UserId,
                OrderItems = orderItems,
                TotalAmount = cart.PizzaCartItems.Sum(pci => pci.Price * pci.Quantity) +
                              cart.DrinkCartItems.Sum(dci => dci.Price * dci.Quantity),
                DeliveryAddress = deliveryAddress
            };
        }



    }
}