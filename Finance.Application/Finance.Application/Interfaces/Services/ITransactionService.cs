using Finance.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Application.Interfaces.Services
{
    public interface ITransactionService
    {
        public ICollection<TransactionDto> GetTransactions();
        public ICollection<TransactionDto> GetTransactionsByUserId(int userId);
        public bool CreateTransaction(TransactionDto transaction);
    }
}
