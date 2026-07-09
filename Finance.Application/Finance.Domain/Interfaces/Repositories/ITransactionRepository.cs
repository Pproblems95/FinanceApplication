using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;

namespace Finance.Domain.Interfaces.Repositories
{
    public interface ITransactionRepository
    {
        ICollection<Transaction> GetTransactions();
        ICollection<Transaction> GetTransactionsByUserId(int userId, DateTime? fromDate, DateTime? untilDate);
        Transaction? GetTransactionByTransactionId(int transactionId);
        Transaction? CreateTransaction(Transaction transaction);
        bool Save();
    }
}
