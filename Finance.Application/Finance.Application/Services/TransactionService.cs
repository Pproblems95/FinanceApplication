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

        public TransactionDto CreateTransaction(TransactionDto createdTransaction)
        {
            if (createdTransaction == null) 
            {
                throw new Exception($"La transaccion no puede ser nula.");
            }

            Transaction? transactionEntity = _mapper.Map<Transaction>(createdTransaction);
            TransactionDto? savedTransaction = _mapper.Map<TransactionDto>(_repository.CreateTransaction(transactionEntity));

            if (savedTransaction == null)
                throw new Exception("Ocurrio un error al crear la transacción.");

            return savedTransaction;
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

        public TransactionDto GetTransactionByTransactionId(int transactionId)
        {
            Transaction? transactionEntity = _repository.GetTransactionByTransactionId(transactionId);

            if (transactionEntity == null)
                throw new KeyNotFoundException($"La transacción con ID {transactionId} no fue encontrada.");

            return _mapper.Map<TransactionDto>(transactionEntity);
        }
    }
}
