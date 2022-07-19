using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent.EventsAndMessages
{
    /// <summary>
    /// Сообщение передаваемое в качестве события
    /// </summary>
    public class BaseEventMessage : CommonEventMessage<object>
    {
        public BaseEventMessage(object Target) : base(Target)
        {

        }
    }

}
