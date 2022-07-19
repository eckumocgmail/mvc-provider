
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.ReceptionFace.Controllers
{
    [Area("ReceptionFace")]
    public class ReceptionController : NavigationController
    {
        public ReceptionController(UserModelsService service) : base(service)
        {

        }

        public IActionResult ReceptionHome()
        {
            return View();
        }
    }
}

            