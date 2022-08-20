
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.BossFace.Controllers
{
    [Area("BossFace")]
    public class BossController : NavigationController
    {
        public BossController(UserModelsService serviceProvider) : base(serviceProvider)
        {

        }

        public IActionResult BossHome()
        {
            return View();
        }
    }
}

            