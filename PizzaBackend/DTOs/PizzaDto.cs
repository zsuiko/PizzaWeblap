namespace PizzaBackend.DTOs
{
    public class CreatePizzaDto //POST
    {
        public string PizzaName { get; set; } = string.Empty;
        public string PizzaDescription { get; set; } = string.Empty;
        public decimal PizzaPrice { get; set; }
        public string PizzaImgUrl { get; set; } = string.Empty;
    }

    public class PizzaDto //GET
    {
        public int Id { get; set; }
        public string PizzaName { get; set; } = string.Empty;
        public string PizzaDescription { get; set; } = string.Empty;
        public decimal PizzaPrice { get; set; }
        public string PizzaImgUrl { get; set; } = string.Empty;
    }
}
