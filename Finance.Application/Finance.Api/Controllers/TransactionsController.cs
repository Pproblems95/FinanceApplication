using System.Collections.Generic;
using System.Threading.Tasks;
using Finance.Domain.Entities;
using Finance.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Finance.Application.DTOs;
using Finance.Domain.Interfaces.Repositories;
using Finance.Application.Interfaces.Services;
namespace Finance.Api.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class TransactionsController : Controller
    {
        private readonly ITransactionService _transactionService;

        public TransactionsController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Transaction>))]
        public IActionResult GetTransactions()
        {
            ICollection<TransactionDto> transactions = _transactionService.GetTransactions();

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
            ICollection<TransactionDto> transactions = _transactionService.GetTransactionsByUserId(userId);

            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            return Ok(transactions);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateTransaction([FromBody] TransactionDto createdTransaction)
        {
            if (createdTransaction == null) 
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
           
            if (_transactionService.CreateTransaction(createdTransaction))
                return Ok("Successfully created");
            else
                return BadRequest("Something went wrong while creating the transaction");

        }
    }
}
