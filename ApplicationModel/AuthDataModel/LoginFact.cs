

using ApplicationDb.Types;

using Newtonsoft.Json;

using System.ComponentModel.DataAnnotations;

namespace ApplicationDb.Entities
{
    [EntityLabel("Факт авторизации пользователя")]
    [SystemEntity()]
    public class LoginFact: FactsTable
    { 
        public int UserID { get; set; }
        [JsonIgnore()]
        public virtual User User { get; set; }
    }
}
