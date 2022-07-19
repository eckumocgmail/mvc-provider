
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.UserFace.Controllers
{
    [Area("UserFace")]
    public class UserController : NavigationController
    {
        public UserController(UserModelsService service) : base(service)
        {

        }

        public IActionResult UserHome()
        {
            return View();
        }
    }
}

            