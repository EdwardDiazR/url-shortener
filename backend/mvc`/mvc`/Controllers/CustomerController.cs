using Microsoft.AspNetCore.Mvc;

namespace mvc_.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        public void CreateCustomer()
        {

        }
    }
}
