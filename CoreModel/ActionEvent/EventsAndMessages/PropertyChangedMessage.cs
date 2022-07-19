using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Сообщение о изменения свойства обьекта
/// </summary>
public class PropertyChangedMessage: MyEvent
{
    public object Source { get; set; }
    public string Property { get; set; }
    public object Before { get; set; }
    public object After { get; set; }


    public PropertyChangedMessage() { 
        Type = "change";
    }

    public string GetBindedActionName()
    {
        return "On" + Property + "Changed";
    }
}