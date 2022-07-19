using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent.EventsAndMessages
{
    public class CallActionMessage
    {
        public int Source { get; set; }

        [NotNullNotEmpty("")]
        public string Action { get; set; }

        [NotNullNotEmpty("")]
        public object Args { get; set; }
    }
}
