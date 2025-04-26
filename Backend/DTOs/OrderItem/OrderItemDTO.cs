﻿using System.Text.Json.Serialization;
using PizzaBackend.DTOs.Product;

namespace PizzaBackend.DTOs.OrderItem
{
    public class OrderItemDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public ProductDTO Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice => Price * Quantity;
    }
}