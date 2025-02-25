using PizzaBackend.Models;
using Microsoft.EntityFrameworkCore;





namespace PizzaBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { 
        }

        public DbSet<User> Users { get; set; }
    }
}
