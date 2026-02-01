using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Finance.Infrastructure.Persistence.Configurations
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction> 
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("transactions");

            builder.HasKey(t => t.Id);
            builder.Property(t => t.UserId).IsRequired();
            builder.Property(t => t.Amount).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(t => t.Date).IsRequired();
            builder.Property(t => t.Description).HasMaxLength(500);
            builder.Property(t => t.Category).HasMaxLength(100);
            builder.Property(t => t.CreatedAt).IsRequired().HasDefaultValue("GETDATE()");
            builder.Property(t => t.UpdatedAt);
            builder.Property(t => t.User).IsRequired();

            
        }
    }
}
