using System.Collections.Generic;
using System.Threading.Tasks;
using Finance.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Api.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly FinanceDbContext _context;

        public TransactionsController(FinanceDbContext context)
        {
            _context = context;
        }

    }
}
