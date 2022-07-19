using ApplicationDb.Types;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ProviderDataModel
{
    public class TariffDescription: DictionaryTable
    {
        public double MonthCostsInRub { get; set; }
        public virtual IList<TariffOptions> TariffOptions { get; set; }

    }
}
