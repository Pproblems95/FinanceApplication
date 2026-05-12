using System.Collections.Generic;
using System.Threading.Tasks;
using Finance.Domain.Entities;
using Finance.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Finance.Application.DTOs;
using Finance.Domain.Interfaces.Repositories;
using Finance.Application.Interfaces.Services;
using Finance.Api.Common;
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
                List<string>? errors = ModelState.Values.SelectMany(v => v.Errors)
                                              .Select(e => e.ErrorMessage)
                                              .ToList();
                return BadRequest(ResponseVM<ICollection<TransactionDto>>.Failure("Invalid model state", errors));
            }

            return Ok(ResponseVM<ICollection<TransactionDto>>.Ok(transactions));
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(ICollection<Transaction>))]
        public IActionResult GetTransactionsByUserId(int userId)
        {
            ICollection<TransactionDto> transactions = _transactionService.GetTransactionsByUserId(userId);

            if (!ModelState.IsValid) 
            {
                List<string>? errors = ModelState.Values.SelectMany(v => v.Errors)
                                              .Select(e => e.ErrorMessage)
                                              .ToList();
                return BadRequest(ResponseVM<ICollection<TransactionDto>>.Failure("Invalid model state", errors));
            }
            return Ok(ResponseVM<ICollection<TransactionDto>>.Ok(transactions));
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public IActionResult CreateTransaction([FromBody] TransactionDto createdTransaction)
        {

            if (!ModelState.IsValid) 
            {
                List<string>? errors = ModelState.Values.SelectMany(v => v.Errors)
                                              .Select(e => e.ErrorMessage)
                                              .ToList();
                return BadRequest(ResponseVM<TransactionDto>.Failure("Invalid model state", errors));
            }
            
            try
            {
                return StatusCode(201, ResponseVM<TransactionDto>.Ok(_transactionService.CreateTransaction(createdTransaction), "Transaction created successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseVM<TransactionDto>.Failure(ex.Message, null));
            }

        }
    }
}
