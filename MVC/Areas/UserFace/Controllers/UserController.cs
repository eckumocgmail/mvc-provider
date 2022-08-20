
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
        public UserModelsService service { get; set; }
        public UserController(IServiceProvider serviceProvider) : base(serviceProvider)
        {

        }

        public IActionResult UserHome()
        {
            return View();
        }
    }
}

            