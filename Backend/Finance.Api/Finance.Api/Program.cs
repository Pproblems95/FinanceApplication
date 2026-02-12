using Finance.Domain;
using Finance.Domain.Interfaces;
using Finance.Infrastructure;
using Finance.Infrastructure.Persistence;
using Finance.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Finance.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //// Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
            builder.Services.AddEndpointsApiExplorer();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<FinanceDbContext>(options =>
            options.UseNpgsql(connectionString,

                npgsqlOptions => npgsqlOptions.MigrationsAssembly("Finance.Infrastructure")));

            var app = builder.Build();

            //// Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment())
            //{
            //    app.MapOpenApi();
            //}

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
