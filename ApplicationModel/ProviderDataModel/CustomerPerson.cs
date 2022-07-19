using ApplicationModel.MapDataModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ProviderDataModel
{
    public class CustomerPerson
    {
        public int AddressID { get; set; }
        public virtual Address Address { get; set; }
    }
}
