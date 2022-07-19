using CoreModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.OrganizationDataModel
{
   
    public class FilialDepartment : NamedObject
    {
 
        public int OrganizationFilialID { get; set; }
        public virtual OrganizationFilial OrganizationFilial { get; set; }
    }
}
