
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.DeveloperFace.Controllers
{
    [Area("DeveloperFace")]
    public class DeveloperController : NavigationController
    {
        public DeveloperController(UserModelsService service) : base(service)
        {

        }

        public IActionResult DeveloperHome()
        {
            return View();
        }
    }
}

            