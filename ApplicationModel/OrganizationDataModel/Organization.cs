using ApplicationDb.Types;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.OrganizationDataModel
{
    public class Organization: NamedObject
    {
        [UniqValidation("ИНН уже зарегистрирован")]
        public string INN { get; set; }

        [UniqValidation("КПП уже зарегистрирован")]
        public string KPP { get; set; }

        [UniqValidation("ОГРН уже зарегистрирован")]
        public string ORGN { get; set; }
    }
}
