using ApplicationDb.Entities;

using CoreModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.DataModel
{
    public class Message : BaseEntity
    {
        public virtual User FromUser { get;set;}
        public virtual User ToUser { get;set;}
    }
}
