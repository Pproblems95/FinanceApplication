using Finance.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Application.DTOs.TransactionDTOs
{
    public class TransactionResponseDto
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }
}
