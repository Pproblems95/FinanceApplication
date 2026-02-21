using System.Collections.Generic;
using System.Threading.Tasks;
using Finance.Domain.Interfaces;
using Finance.Domain.Entities;
using Finance.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Finance.Application.DTOs;

namespace Finance.Api.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class TransactionsController : Controller
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;
        public TransactionsController(ITransactionRepository transactionRepository, IMapper mapper)
        {
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Transaction>))]
        public IActionResult GetTransactions()
        {
            ICollection<TransactionDto> transactions = _mapper.Map<ICollection<TransactionDto>>(_transactionRepository.GetTransactions());

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
            ICollection<TransactionDto> transactions = _mapper.Map<ICollection<TransactionDto>>(_transactionRepository.GetTransactionsByUserId(userId));

            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            return Ok(transactions);
        } 
    }
}
