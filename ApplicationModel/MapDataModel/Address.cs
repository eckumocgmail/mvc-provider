using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.MapDataModel
{
    public class Address: Location
    {
        public string HumanAddress { get; set; }
        public string PostCode { get; set; }
    }
}
