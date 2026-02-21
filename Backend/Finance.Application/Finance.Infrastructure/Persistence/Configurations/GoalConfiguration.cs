using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Finance.Infrastructure.Persistence.Configurations
{
    public class GoalConfiguration : IEntityTypeConfiguration<Goal>
    {
        public void Configure(EntityTypeBuilder<Goal> builder)
        {
            builder.ToTable("goals");

            builder.HasKey(g => g.Id);

            builder.Property(g => g.TargetAmount).IsRequired();
            builder.Property(g => g.StartDate).IsRequired();
            builder.Property(g => g.EndDate);
            builder.Property(g => g.Description).HasMaxLength(500);
            builder.Property(g => g.OriginalEstimatedEndDate).IsRequired();

            builder.HasOne(g => g.User)
                   .WithMany(u => u.Goals)
                   .HasForeignKey(g => g.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasData(
                new Goal
                {
                    Id = 1,
                    UserId = 1,
                    TargetAmount = 5000.00,
                    StartDate = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    OriginalEstimatedEndDate = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    Description = "Ahorro para Viaje a Japón"
                },
                new Goal
                {
                    Id = 2,
                    UserId = 2,
                    TargetAmount = 20000.00,
                    StartDate = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    OriginalEstimatedEndDate = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    Description = "Enganche de Auto"
                },
                new Goal
                {
                    Id = 3,
                    UserId = 3,
                    TargetAmount = 1000.00,
                    StartDate = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    OriginalEstimatedEndDate = new DateTime(2026, 2, 4, 0, 0, 0, DateTimeKind.Utc),
                    Description = "Fondo de Emergencia Inicial"
                }
            );
        }
    }
}
