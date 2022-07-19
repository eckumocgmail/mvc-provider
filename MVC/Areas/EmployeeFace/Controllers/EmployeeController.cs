
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.EmployeeFace.Controllers
{
    [Area("EmployeeFace")]
    public class EmployeeController : NavigationController
    {
        public EmployeeController(UserModelsService service) : base(service)
        {

        }

        public IActionResult EmployeeHome()
        {
            return View();
        }
    }
}

            