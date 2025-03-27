namespace PizzaBackend.Models
{
    public class Coupon
    {
        public int CouponId { get; set; } // Egyedi azonosító
        public string Code { get; set; } // Kupon kódja
        public string DiscountType { get; set; } // Kedvezmény típusa (pl. "Százalékos", "Fix összeg")
        public decimal DiscountValue { get; set; } 
        public DateTime ValidFrom { get; set; } 
        public DateTime ValidTo { get; set; } 
        public int UsageLimit { get; set; }
        public int UsedCount { get; set; } = 0; 
    }
}
