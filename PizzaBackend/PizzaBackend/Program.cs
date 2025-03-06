using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PizzaBackend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace PizzaBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 🔹 CORS beállítások a frontendhez (React / Vite)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("pizzafrontend",
                    policy => policy.WithOrigins("http://localhost:5173") // Vite frontend URL-je
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .AllowCredentials());
            });

            // 🔹 Adatbázis kapcsolat beállítása (SQLite)
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            // 🔹 JWT Konfiguráció
            var jwtKey = builder.Configuration["Jwt:Key"];
            var jwtIssuer = builder.Configuration["Jwt:Issuer"];
            var jwtAudience = builder.Configuration["Jwt:Audience"];

            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new Exception("❌ A JWT Key nincs beállítva! Ellenőrizd az appsettings.json fájlt.");
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = signingKey
                    };
                });

            builder.Services.AddAuthorization();

            // 🔹 Swagger dokumentáció (JWT Auth beállítás)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Írd be a token-t ebben a formában: Bearer {token}"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new List<string>()
                    }
                });
            });

            // 🔹 MVC Controllers engedélyezése
            builder.Services.AddControllers();

            var app = builder.Build();

            // 🔹 CORS alkalmazása
            app.UseCors("pizzafrontend");

            // 🔹 Swagger UI konfiguráció
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // 🔹 FONTOS! Autentikáció és jogosultságkezelés
            app.UseAuthentication(); // 🔥 JWT token ellenőrzés
            app.UseAuthorization();  // 🔥 Jogosultságok ellenőrzése

            app.MapControllers();

            app.Run();
        }
    }
}
