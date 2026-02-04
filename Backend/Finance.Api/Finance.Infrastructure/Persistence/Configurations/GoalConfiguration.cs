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
        }
    }
}
