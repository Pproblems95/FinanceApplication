using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Domain.Entities
{
    public class Goal
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double TargetAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public DateTime OriginalEstimatedEndDate { get; set; }
        public User User { get; set; }
    }
}
