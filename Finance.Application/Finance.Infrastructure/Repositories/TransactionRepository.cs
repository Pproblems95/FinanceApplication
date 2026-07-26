using Finance.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces.Repositories;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

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

        public async Task<ICollection<Transaction>> GetTransactionsByUserId(int userId, DateTime? fromDate, DateTime? untilDate, DateTime? nextCursorCreatedAt, int? nextCursorId, int pageSize)
        {
            IQueryable<Transaction>? query = _context.Transactions
            .AsNoTracking()
            .Where(t => t.UserId == userId);

            if (fromDate.HasValue)
                query = query.Where(t => t.Date >= fromDate.Value);

            if (untilDate.HasValue)
                query = query.Where(t => t.Date <= untilDate.Value);

            if (nextCursorCreatedAt.HasValue && nextCursorId.HasValue)
            {
                query = query.Where(t =>
                    t.CreatedAt < nextCursorCreatedAt.Value ||
                    (t.CreatedAt == nextCursorCreatedAt.Value && t.Id < nextCursorId.Value));
            }

            return await query
                .OrderByDescending(t => t.CreatedAt)
                .ThenByDescending(t => t.Id)
                .Take(pageSize + 1)
                .ToListAsync();
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
