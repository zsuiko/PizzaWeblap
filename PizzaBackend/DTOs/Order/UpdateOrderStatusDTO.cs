﻿using static PizzaBackend.Models.Order;

namespace PizzaBackend.DTOs.Order
{
    public class UpdateOrderStatusDTO
    {
        public OrderStatus Status { get; set; }
    }
}