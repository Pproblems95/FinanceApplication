using Finance.Domain.Entities;
using Finance.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Infrastructure.Persistence
{
    public class FinanceDbContext : DbContext
    {
        public FinanceDbContext(DbContextOptions<FinanceDbContext> options) : base(options) 
        {

        }

        public DbSet <User> Users { get; set; }
        public DbSet <Transaction> Transactions { get; set; }
        public DbSet <Goal> Goals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            new UserConfiguration().Configure(modelBuilder.Entity<User>());
            new TransactionConfiguration().Configure(modelBuilder.Entity<Transaction>());
            new GoalConfiguration().Configure(modelBuilder.Entity<Goal>());
        }
    }
}
