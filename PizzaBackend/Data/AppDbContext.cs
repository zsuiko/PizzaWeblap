using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Models;

namespace PizzaBackend.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<PizzaCartItem> PizzaCartItems { get; set; }
        public DbSet<DrinkCartItem> DrinkCartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

            // User és RefreshToken közötti kapcsolat
            modelBuilder.Entity<User>()
                .HasMany(u => u.RefreshTokens)
                .WithOne(rt => rt.User)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User és Order közötti kapcsolat
            modelBuilder.Entity<Order>()
               .HasOne(o => o.User)
               .WithMany(u => u.Orders)
               .HasForeignKey(o => o.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            // Order és OrderItem közötti kapcsolat
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Pizza és OrderItem közötti kapcsolat
            modelBuilder.Entity<Pizza>()
                .HasMany(p => p.OrderItems)
                .WithOne(oi => oi.Pizza)
                .HasForeignKey(oi => oi.PizzaId)
                .OnDelete(DeleteBehavior.Cascade);

            // User és Cart közötti kapcsolat
            modelBuilder.Entity<User>()
                .HasMany(u => u.Carts) // Egy felhasználónak több kosara lehet
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Cart és PizzaCartItem közötti kapcsolat
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.PizzaCartItems)
                .WithOne(pci => pci.Cart)
                .HasForeignKey(pci => pci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            // Cart és DrinkCartItem közötti kapcsolat
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.DrinkCartItems)
                .WithOne(dci => dci.Cart)
                .HasForeignKey(dci => dci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            // Pizza és PizzaCartItem közötti kapcsolat
            modelBuilder.Entity<Pizza>()
                .HasMany(p => p.PizzaCartItems)
                .WithOne(pci => pci.Pizza)
                .HasForeignKey(pci => pci.PizzaId)
                .OnDelete(DeleteBehavior.Cascade);

            // Drink és DrinkCartItem közötti kapcsolat
            modelBuilder.Entity<Drink>()
                .HasMany(d => d.DrinkCartItems)
                .WithOne(dci => dci.Drink)
                .HasForeignKey(dci => dci.DrinkId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);


            // Seed adatok hozzáadása a Pizza táblához
            modelBuilder.Entity<Pizza>().HasData(
                new Pizza
                {
                    PizzaId = 1,
                    Name = "Margherita",
                    Description = "Klasszikus margherita pizza",
                    Size = Sizes.Közepes,
                    Category = PizzaCategories.Vegetáriánus,
                    ImageUrl = "https://example.com/margherita.jpg",
                    Price = 2799,
                    IsAvailable = true
                },
                new Pizza
                {
                    PizzaId = 2,
                    Name = "Pepperoni",
                    Description = "Pepperoni pizza",
                    Size = Sizes.Nagy,
                    Category = PizzaCategories.Húsos,
                    ImageUrl = "https://example.com/pepperoni.jpg",
                    Price = 3100,
                    IsAvailable = true
                }
            );

            // Seed adatok hozzáadása a Drink táblához
            modelBuilder.Entity<Drink>().HasData(
                new Drink
                {
                    DrinkId = 1,
                    Name = "Cola",
                    Description = "Üdítő ital",
                    Category = DrinkCategories.Szénsavas,
                    ImageUrl = "https://example.com/cola.jpg",
                    Price = 699,
                    IsAvailable = true
                },
                new Drink
                {
                    DrinkId = 2,
                    Name = "Narancslé",
                    Description = "Friss narancslé",
                    Category = DrinkCategories.Szénsavmentes,
                    ImageUrl = "https://example.com/orange.jpg",
                    Price = 599,
                    IsAvailable = true
                }
            );

            

        }
    }
}