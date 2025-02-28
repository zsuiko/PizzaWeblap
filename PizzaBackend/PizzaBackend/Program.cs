
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;



namespace PizzaBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("pizzafrontend",
                    policy => policy.WithOrigins("http://localhost:5173") // Vite frontend URL-je
                                    .AllowAnyMethod()
                                    .AllowAnyHeader());
            });

            
            // Add services to the container.

            builder.Services.AddControllers();
           

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

        
            builder.Services.AddDbContext<AppDbContext>(Options =>
            {
                Options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            var app = builder.Build();
            app.UseCors("pizzafrontend");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
