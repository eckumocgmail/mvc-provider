using CoreHttp.Session;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ApplicationModel
{
    public class NavigationController : PageController
    {
        public NavigationController(UserModelsService service) : base(service)
        {
        }
    }
}
