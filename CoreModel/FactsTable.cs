using ApplicationDb.Entities;

using CoreModel;

using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ApplicationDb.Types
{
    /// <summary>
    /// Фиксирует события бизнес процессов
    /// </summary>
    public class FactsTable: BaseEntity
    {

        [NotNullNotEmpty("Необходимо указать дату")]
        [InputDateTime( )]
        public DateTime Created { get; set; }

        [Label("Календарь")]
        public int CalendarID { get; set; }
        public virtual Calendar Calendar { get; set; }
    }
}
