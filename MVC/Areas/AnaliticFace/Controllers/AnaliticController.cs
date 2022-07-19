using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLogic.Areas.AnaliticFace.Controllers
{
    [Area("AnaliticFace")]
    public class AnaliticController : NavigationController
    {
        public AnaliticController(UserModelsService service) : base(service)
        {
            
        }

        public IActionResult AnaliticHome()
        {
            return View();
        }
    }
}
