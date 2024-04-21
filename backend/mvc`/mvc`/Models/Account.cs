using static mvc_.Controllers.HomeController;

namespace mvc_.Models
{
    public class Account
    {
        public double Balance { get; set; }
        public string CustomerId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Customer customer { get; set; }

        public Account(double balance,string customerId,Customer c)
        {
            this.Balance = balance;
            this.CustomerId = customerId;
            this.CreatedDate = DateTime.Now;
            this.customer = c;
        }
    }
}
