using PizzaBackend.DTOs.CartItem;
using System.Collections.Generic;

namespace PizzaBackend.DTOs.Cart
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public string UserId { get; set; }
        public bool IsActive { get; set; }
        public List<PizzaCartItemDTO> PizzaCartItems { get; set; } = new List<PizzaCartItemDTO>();
        public List<DrinkCartItemDTO> DrinkCartItems { get; set; } = new List<DrinkCartItemDTO>();
        public decimal TotalAmount => PizzaCartItems.Sum(p => p.TotalPrice) + DrinkCartItems.Sum(d => d.TotalPrice);
    }
}