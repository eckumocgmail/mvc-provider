using ApplicationModel.OrganizationDataModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ProviderDataModel
{
    public class CustomerOrganization: CustomerBase
    {
        public int OrganizationID { get; set; }
        public virtual Organization Organization { get; set; }
    }
}
