using Finance.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces.Repositories;
using System.Globalization;

namespace Finance.Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly FinanceDbContext _context;

        public TransactionRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public ICollection<Transaction> GetTransactions()
        {
            return _context.Transactions.OrderBy(t => t.Id).ToList();
        }
        

        public ICollection<Transaction> GetTransactionsByUserId(int userId, DateTime? fromDate, DateTime? untilDate)
        {
            if(fromDate == null || untilDate == null)
            {
                return _context.Transactions.Where(
                t => t.UserId == userId)
                .OrderBy(t => t.Id)
                .ToList();
            }
            else
            {
                return _context.Transactions.Where(
                t => t.UserId == userId &&
                t.Date >= fromDate &&
                t.Date <= untilDate)
                .OrderBy(t => t.Id)
                .ToList();
            }
            
        }

        public Transaction? GetTransactionByTransactionId(int transactionId)
        {
            return _context.Transactions.Where(t => t.Id == transactionId).FirstOrDefault();
        }

        public Transaction? CreateTransaction(Transaction transaction)
        {
            _context.Add(transaction);
            
            if(Save())
            {
                return transaction;
            }
            else
            {
                return null;
            }

        }

        public bool Save() 
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
