using AutoMapper;
using Finance.Application.Common;
using Finance.Application.DTOs;
using Finance.Application.Interfaces.Services;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Text;
using System.Text.Json;


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
        public async Task<PagedResponse<ICollection<TransactionDto>>> GetTransactionsByUserId(int userId, string? fromDate, string? untilDate, string? nextCursor, int pageSize)
        {
            DateTime? parsedFromDate = null;
            DateTime? parsedUntilDate = null;
            DateTime? nextCursorCreatedAt = null;
            int? nextCursorId = null;
            TransactionCursor? transactionCursor;
            int clampedPageSize = Math.Clamp(pageSize, 1, 50);

            try
            {
                if (nextCursor != null)
                {
                    byte[] jsonBytes = Convert.FromBase64String(nextCursor);
                    string jsonString = Encoding.UTF8.GetString(jsonBytes);
                    transactionCursor = JsonSerializer.Deserialize<TransactionCursor>(jsonString);
                    nextCursorCreatedAt = transactionCursor?.CreatedAt;
                    nextCursorId = transactionCursor?.Id;
                }

                if (fromDate != null && untilDate != null)
                {
                    DateTime localFrom = DateTime.Parse(fromDate, CultureInfo.InvariantCulture);
                    DateTime localUntil = DateTime.Parse(untilDate, CultureInfo.InvariantCulture);
                    parsedFromDate = DateTime.SpecifyKind(localFrom, DateTimeKind.Utc);
                    parsedUntilDate = DateTime.SpecifyKind(localUntil, DateTimeKind.Utc);
                }
                ICollection<TransactionDto> transactions = _mapper.Map<ICollection<TransactionDto>>(await _repository.GetTransactionsByUserId(userId, parsedFromDate, parsedUntilDate, nextCursorCreatedAt, nextCursorId, clampedPageSize));
                
                if (transactions == null)
                    transactions = [];

                TransactionDto? cursor = transactions.LastOrDefault();
                string parsedCursorOrEmptyString = "";
                if (cursor != null)
                {
                    string jsonString = JsonSerializer.Serialize(cursor);
                    byte[] byteData = Encoding.UTF8.GetBytes(jsonString);
                    parsedCursorOrEmptyString = Convert.ToBase64String(byteData);
                }

                if (transactions.Count > pageSize && transactions.Count > 1)
                {
                    TransactionDto lastItem = transactions.Last();
                    transactions.Remove(lastItem);
                }
                
                return PagedResponse<ICollection<TransactionDto>>.Create(transactions, clampedPageSize, parsedCursorOrEmptyString);

            }
            catch (Exception ex) 
            {
                throw new Exception($"Ocurrio un error al obtener las transacciones.");
            }
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
