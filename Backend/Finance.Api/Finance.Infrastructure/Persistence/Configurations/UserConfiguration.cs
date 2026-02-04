using System;
using System.Collections.Generic;
using System.Text;
using Finance.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Finance.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");

            builder.HasKey(u => u.Id);
            builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
            builder.Property(u => u.LastName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Username).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
            builder.Property(u => u.HashedPassword).IsRequired();
            builder.Property(u => u.CreatedAt).IsRequired().HasDefaultValueSql("now()");
            builder.Property(u => u.IsActive).IsRequired().HasDefaultValue(true);

            builder.HasIndex(u => u.Email).IsUnique();
        }
    }
}
