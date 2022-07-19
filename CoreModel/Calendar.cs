using CoreModel;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDb.Entities
{
    [EntityLabel("Дата предоставления отчёта")]
    [SystemEntity()]
    public class Calendar: 
        BaseEntity
    {       
      


        [Label("День")]
        public int Day { get; set; }

        [Label("Неделя")]
        public int Week { get; set; }

        [Label("Месяц")]
        public int Month { get; set; }

        [Label("Квартал")]
        public int Quarter { get; set; }

        [Label("Год")]
        public int Year { get; set; }



        [Label("Unix-время")]
        public long Timestamp { get; set; }
    }
}
