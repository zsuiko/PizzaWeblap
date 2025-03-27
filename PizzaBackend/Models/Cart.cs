using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaBackend.Models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

        public string UserId { get; set; }

        public bool IsActive { get; set; } = true;
        
        public User User { get; set; }
        public ICollection<PizzaCartItem> PizzaCartItems { get; set; } = new List<PizzaCartItem>();
        public ICollection<DrinkCartItem> DrinkCartItems { get; set; } = new List<DrinkCartItem>();

    }
}
