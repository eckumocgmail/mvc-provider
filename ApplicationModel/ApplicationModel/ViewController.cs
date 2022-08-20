using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ApplicationModel
{
    public class ViewController : AbstractController
    {
        public ViewController(IServiceProvider serviceProvider): base(serviceProvider)
        {
        }
    }
}
