using Microsoft.AspNetCore.Mvc;
using PizzaBackend.Data;

namespace PizzaBackend.Controllers
{
    public class CheckoutController
    {
        [Route("api/[controller]")]
        [ApiController]
        public class CeheckoutController : ControllerBase
        {
            private readonly AppDbContext _context;

            public CeheckoutController(AppDbContext context)
            {
                _context = context;
            }

        }

    }
}
