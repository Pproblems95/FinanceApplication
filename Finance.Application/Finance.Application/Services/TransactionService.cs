using AutoMapper;
using Finance.Application.DTOs;
using Finance.Application.Interfaces.Services;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;


namespace Finance.Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;
        private readonly IMapper _mapper;
        public TransactionService(ITransactionRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public bool CreateTransaction(TransactionDto createdTransaction)
        {
            if (createdTransaction == null) 
            {
                return false;
            }

            var transactionEntity = _mapper.Map<Transaction>(createdTransaction);

            return _repository.CreateTransaction(transactionEntity);
        }

        public ICollection<TransactionDto> GetTransactions()
        {
            ICollection<TransactionDto> transactions = _mapper.Map<ICollection<TransactionDto>>(_repository.GetTransactions());
            
            if (transactions == null)
                transactions = [];

            return transactions;
        }

        public ICollection<TransactionDto> GetTransactionsByUserId(int userId)
        {
            ICollection<TransactionDto> transactions = _mapper.Map<ICollection<TransactionDto>>(_repository.GetTransactionsByUserId(userId));

            if (transactions == null)
                transactions = [];

            return transactions;
        }
    }
}
