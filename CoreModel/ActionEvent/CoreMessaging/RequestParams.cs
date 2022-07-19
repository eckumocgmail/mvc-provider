using Newtonsoft.Json.Linq;

using System.Collections.Generic;

namespace ApplicationCore.Messaging
{
    public class RequestParams
    {
        public string path { get; set; }
        public JObject pars { get; set; }

        public byte[] blob { get; set; }
    }
}
