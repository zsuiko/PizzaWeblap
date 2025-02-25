using Microsoft.AspNetCore.Identity;

namespace PizzaBackend.Models
{
    public class Pizza
    {
        public int Id { get; set; }

        public string PizzaName { get; set; } = string.Empty;
        public string PizzaDescription { get; set; } = string.Empty;
        public decimal PizzaPrice { get; set; }
        public string PizzaImgUrl {  get; set; } = string.Empty;

        public DateTime PizzaCreatedDate { get; set; } = DateTime.Now;

    }
}
