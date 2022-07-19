using CoreModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.DataModel
{
    public class Account : BaseEntity
    {
        public Account() { }
        public Account(string v1, string v2)
        {
        }

        public string ActivationKey { get; set; }
        public string Email { get; set; }
        public DateTime? Activated { get; set; } = null;
        public string Hash { get; set; }
        public string RFID { get; set; }
    }
}
