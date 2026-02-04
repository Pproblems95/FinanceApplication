using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Goal> Goals { get; set; }

    }
}
