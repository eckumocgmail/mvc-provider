using ApplicationDb.Entities;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ProviderDataModel
{
    public class CustomerBase: User
    {
        public int? IPPhoneID { get; set; }
        public virtual IPPhone IPPhone { get; set; }


        public int? TVID { get; set; }
        public virtual TV TV { get; set; }
    }
}
