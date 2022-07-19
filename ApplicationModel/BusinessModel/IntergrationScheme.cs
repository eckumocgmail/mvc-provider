using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CoreModel;


[EntityLabel("Расписание")]
public class IntergrationScheme: NamedObject
{
    [Label("Время старта")]
    public DateTime Begin { get; set; }


    [Label("Время ожидания")]
    public long TimeoutMs { get; set; }
}