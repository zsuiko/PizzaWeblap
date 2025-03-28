
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PizzaBackend.Data;
using PizzaBackend.Interfaces;
using PizzaBackend.Models;
using PizzaBackend.Services;



namespace PizzaBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


           

            // Naplózás hozzáadása
            builder.Logging.AddConsole(); // Konzolra naplózás
            builder.Logging.AddDebug();   // Debug ablakba naplózás

            builder.Services.AddDbContext<AppDbContext>(options =>
              options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
          );

            builder.Services.AddIdentity<User, IdentityRole>(options => {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 12;
            })
                .AddEntityFrameworkStores<AppDbContext>();



            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();



            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
            });

         /*
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy =>
                    {
                        policy.AllowAnyOrigin() 
                              .AllowAnyMethod()
                              .AllowAnyHeader();
                    });
            });
*/   
            var jwtKey = builder.Configuration["Jwt:Key"];
            var jwtIssuer = builder.Configuration["Jwt:Issuer"];
            var jwtAudience = builder.Configuration["Jwt:Audience"];

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                options.DefaultChallengeScheme =
                options.DefaultForbidScheme =
                options.DefaultScheme =
                options.DefaultSignInScheme =
                options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])),

                };
            });

            builder.Services.AddAuthorization();

            builder.Services.AddScoped<ITokenService, TokenService>();







            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pizzéria API V1");
                c.InjectStylesheet("/css/swagger-custom.css");
                    c.DocumentTitle = "Pizzéria API - Dark Mode";
                });
            }
            ;

            app.UseHttpsRedirection();
            app.UseDefaultFiles(); 
            app.UseStaticFiles(); 



            app.UseCors("AllowAll");

            app.UseAuthentication();
            app.UseAuthorization();

           
            app.MapControllers();

            app.MapFallbackToFile("/index.html");


            app.Run();
        }
    }
}
