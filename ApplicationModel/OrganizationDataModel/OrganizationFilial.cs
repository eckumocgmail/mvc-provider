using ApplicationModel.MapDataModel;

using CoreModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.OrganizationDataModel
{
    public class OrganizationFilial: BaseEntity
    {

        public int AddressID { get; set; }
        public virtual Address Address { get; set; }

        public int OrganizationID { get; set; }
        public virtual Organization Organization { get; set; }
    }
}
