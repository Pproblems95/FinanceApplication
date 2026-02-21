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

            builder.Property(t => t.Amount).IsRequired().HasColumnType("numeric(18,2)");
            builder.Property(t => t.Date).IsRequired();
            builder.Property(t => t.Description).HasMaxLength(500);
            builder.Property(t => t.Category).HasMaxLength(100);
            builder.Property(t => t.CreatedAt).IsRequired().HasDefaultValueSql("now()");
            builder.Property(t => t.UpdatedAt);

            builder.HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasData(
                new Transaction
                {
                    Id = 1,
                    UserId = 1,
                    Amount = 50.00,
                    Date = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    Description = "Suscripción Netflix",
                    Category = "Entretenimiento",
                    CreatedAt = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc)
                },
                new Transaction
                {
                    Id = 2,
                    UserId = 2,
                    Amount = 1200.50,
                    Date = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    Description = "Pago de Renta",
                    Category = "Vivienda",
                    CreatedAt = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc)
                },
                new Transaction
                {
                    Id = 3,
                    UserId = 3,
                    Amount = 15.75,
                    Date = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    Description = "Café Starbucks",
                    Category = "Alimentación",
                    CreatedAt = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}
