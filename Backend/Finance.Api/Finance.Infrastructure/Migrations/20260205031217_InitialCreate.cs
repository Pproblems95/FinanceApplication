using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Finance.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Username = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    HashedPassword = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "goals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TargetAmount = table.Column<double>(type: "double precision", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    OriginalEstimatedEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_goals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_goals_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "transactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<double>(type: "numeric(18,2)", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_transactions_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "CreatedAt", "Email", "HashedPassword", "IsActive", "LastName", "Name", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), "john@example.com", "password123", true, "Doe", "John", "jdoe" },
                    { 2, new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), "jane@example.com", "password456", true, "Smith", "Jane", "jsmith" },
                    { 3, new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), "alice@example.com", "password789", true, "Johnson", "Alice", "ajohnson" }
                });

            migrationBuilder.InsertData(
                table: "goals",
                columns: new[] { "Id", "Description", "EndDate", "OriginalEstimatedEndDate", "StartDate", "TargetAmount", "UserId" },
                values: new object[,]
                {
                    { 1, "Ahorro para Viaje a Japón", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), 5000.0, 1 },
                    { 2, "Enganche de Auto", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), 20000.0, 2 },
                    { 3, "Fondo de Emergencia Inicial", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), 1000.0, 3 }
                });

            migrationBuilder.InsertData(
                table: "transactions",
                columns: new[] { "Id", "Amount", "Category", "CreatedAt", "Date", "Description", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, 50.0, "Entretenimiento", new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), "Suscripción Netflix", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, 1200.5, "Vivienda", new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), "Pago de Renta", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 3, 15.75, "Alimentación", new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 4, 0, 0, 0, 0, DateTimeKind.Utc), "Café Starbucks", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_goals_UserId",
                table: "goals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_UserId",
                table: "transactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_users_Email",
                table: "users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "goals");

            migrationBuilder.DropTable(
                name: "transactions");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
