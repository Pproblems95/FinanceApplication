using Finance.Application.DTOs;
using Finance.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Finance.Application.Common;

namespace Finance.Application.Interfaces.Services
{
    public interface ITransactionService
    {
        public ICollection<TransactionDto> GetTransactions();
        public Task<PagedResponse<ICollection<TransactionDto>>> GetTransactionsByUserId(int userId, string? fromDate, string? untilDate, string? nextCursor, int pageSize);
        public TransactionDto CreateTransaction(TransactionDto transaction);
        public TransactionDto GetTransactionByTransactionId(int transactionId);
    }
}
