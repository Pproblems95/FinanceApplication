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
using Finance.Application.Common;
using System.Text;
using System.Text.Json;
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
        [ProducesResponseType(200, Type = typeof(PagedResponse<ICollection<Transaction>>))]
        public async Task<IActionResult> GetTransactionsByUserId( [FromRoute] int userId,  [FromQuery] string? nextCursor,
            [FromQuery] string? fromDate, [FromQuery] string? untilDate, [FromQuery] int pageSize = 10)

        {
            PagedResponse<ICollection<TransactionDto>> transactions = await _transactionService.GetTransactionsByUserId(userId, fromDate, untilDate, nextCursor, pageSize);

            if (!ModelState.IsValid) 
            {
                List<string>? errors = ModelState.Values.SelectMany(v => v.Errors)
                                              .Select(e => e.ErrorMessage)
                                              .ToList();
                return BadRequest(ResponseVM<ICollection<TransactionDto>>.Failure("Invalid model state", errors));
            }
            return Ok(ResponseVM<PagedResponse<ICollection<TransactionDto>>>.Ok(transactions));
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
