using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;

namespace Finance.Domain.Interfaces
{
    public interface ITransactionRepository
    {
        ICollection<Transaction> GetTransactions();
        ICollection<Transaction> GetTransactionsByUserId(int userId);
        bool CreateTransaction(Transaction transaction);
        bool Save();
    }
}
