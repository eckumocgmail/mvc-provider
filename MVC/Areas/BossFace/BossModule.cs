using LibModule.Application;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLogic.Areas.AnaliticFace
{
    public class BossModule : DomainModule
    {
        public override IEnumerable<PageModule> GetPageModules()
        {
            return new List<PageModule>() { };
        }
    }
}
