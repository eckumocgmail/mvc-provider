
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.AdminFace.Controllers
{
    [Area("AdminFace")]
    public class AdminController : NavigationController
    {
        public AdminController(UserModelsService service) : base(service)
        {

        }

        public IActionResult AdminHome()
        {
            return View();
        }
    }
}

            