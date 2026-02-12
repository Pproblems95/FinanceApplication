using System.Collections.Generic;
using System.Threading.Tasks;
using Finance.Domain.Interfaces;
using Finance.Domain.Entities;
using Finance.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Api.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class TransactionsController : Controller
    {
        private readonly ITransactionRepository _transactionRepository;
        public TransactionsController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Transaction>))]
        public IActionResult GetTransactions()
        {
            ICollection<Transaction> transactions = _transactionRepository.GetTransactions();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(transactions);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(ICollection<Transaction>))]
        public IActionResult GetTransactionsByUserId(int userId)
        {
            ICollection<Transaction> transactions = _transactionRepository.GetTransactionsByUserId(userId);

            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            return Ok(transactions);
        } 
    }
}
