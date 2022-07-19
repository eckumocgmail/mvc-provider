using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceAuthorization.Authorization.Entities
{
    public partial class IAccount
    {
        public DateTime? Activated { get; set; }
        public string ActivationKey { get; set; }
        public string Email { get; set; }
        public string Hash { get; set; }
        public string RFID { get; set; }
    }
}
