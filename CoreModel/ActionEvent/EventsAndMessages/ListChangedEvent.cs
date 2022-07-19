using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent.EventsAndMessages
{
    public class ListChangedEvent : BaseEventMessage
    {
        public ListChangedEvent(ListChangesMessage Target) : base(Target)
        {
        }

        public ListChangesMessage GetChanges()
        {
            return (ListChangesMessage)this.Target;
        }
    }
}
