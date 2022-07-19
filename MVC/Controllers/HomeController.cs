using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using MVC.Models;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly APIAuthorization _auth;

        public HomeController(ILogger<HomeController> logger, APIAuthorization auth)
        {
            _logger = logger;
            _auth = auth;
        }

        public IActionResult Index()
        {
            ViewData["actions"] = GetType().GetMethods().Where(p=>p.ReturnType.Name=="IActionResult").Select(m => m.Name).ToList();
      
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
