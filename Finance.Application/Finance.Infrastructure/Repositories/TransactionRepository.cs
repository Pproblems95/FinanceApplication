using Finance.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;

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
        
        public ICollection<Transaction> GetTransactionsByUserId(int userId)
        {
            return _context.Transactions.Where(t => t.UserId == userId)
                .OrderBy(t => t.Id)
                .ToList();
        }

        public bool CreateTransaction(Transaction transaction)
        {
            //var user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            //User foundUser = new User()
            //{

            //};

            throw new NotImplementedException();
        }

        public bool Save() 
        {
            throw new NotImplementedException();
        }
    }
}
