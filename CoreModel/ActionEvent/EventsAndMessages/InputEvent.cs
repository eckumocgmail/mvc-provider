using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent.EventsAndMessages
{
    public class InputEvent
    {

        [NotNullNotEmpty("")]
        public int Source { get; set; }

        [NotNullNotEmpty("")]
        public string Property { get; set; }
        
        public object Value { get; set; }
    }
}
