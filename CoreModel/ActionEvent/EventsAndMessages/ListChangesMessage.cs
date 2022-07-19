using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent.EventsAndMessages
{
    public class ListChangesMessage
    {
        public object Item { get; set; }
        public string Action { get; set; }
    }
}
