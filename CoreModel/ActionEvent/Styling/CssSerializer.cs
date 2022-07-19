using System.Collections.Generic;

public class CssSerializer
{
    /// <summary>
    /// Форматированный вывод свойств CSS
    /// </summary>
    /// <param name="valuesMap"></param>
    /// <param name="attrsMap"></param>
    /// <returns></returns>
    internal string Seriallize(Dictionary<string, object> valuesMap, Dictionary<string, Dictionary<string,string>> attrsMap)
    {
        string text = "";        
        foreach(var p in valuesMap)
        {
            if (p.Key == "ClassList") continue;
            text += $"{Naming.ToKebabStyle(p.Key)}: {Formating.ToQualifiedString(p.Value, attrsMap[p.Key])}; ";
        }
        return text;
    }
}