using Microsoft.AspNetCore.Mvc;
using mvc_.Models;
using System.Diagnostics;

namespace mvc_.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public class Customer { 
        public string Name { get; set; }

         
        }

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            int AccountNumber = 1;
            Customer customer = new Customer()
            {
                Name = "Juan"
            };

            Account account = new Account(250000, "40208945564",customer);


            string dayOfWeek = AccountNumber switch
            {
                1 => "Monday",
                2=>"Tuesdat",
                3=>"Wednesday",
                4=>"Thursday",
                5=>"Friday",
                6=>"Saturday",
                7=>"Sunday"
            };

            ViewData["Message"] = account.Balance;

            return View(account);
        }

        public IActionResult CustomerProfile() { 

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
