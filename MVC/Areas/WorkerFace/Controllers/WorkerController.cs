
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.WorkerFace.Controllers
{
    [Area("WorkerFace")]
    public class WorkerController : NavigationController
    {
        public WorkerController(UserModelsService service) : base(service)
        {

        }

        public IActionResult WorkerHome()
        {
            return View();
        }
    }
}

            