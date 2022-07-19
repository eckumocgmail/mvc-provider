using Microsoft.EntityFrameworkCore.Metadata;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;


public class Formating
{
    public static string NormalzieStackTrace( Exception ex)
    {
        string s = ex.StackTrace;
        int i = s.IndexOf(":line")+ ":line".Length;
        if (i < (s.Length + 1)) i++;        
        while(i < (s.Length + 1))
        {
            if(Validation.IsNumber(s[i] + "") == false)
            {
                break;
            }
            else
            {
                i++;
            }
        }
        s = s.Substring(0, i) + "\n" + s.Substring(i);
        return s;
    }


    public static string ToCssText(Dictionary<string, object> options)
    {
        string text = "";
        foreach (var option in options)
        {
            text += $"{Naming.ToKebabStyle(option.Key)}: {option.Value};\n";
        }
        return text;
    }
    
    public static string Display(object p)
    {
        return p.ToString();
    }

    /// <summary>
    /// Текстовое значение вывода данных. Анализирует атрибуты свойства.
    /// </summary>
    /// <param name="value"></param>
    /// <param name="v"></param>
    /// <returns></returns>
    internal static string ToQualifiedString(object value, Dictionary<string, string> attrs)
    {
        string result = "";
        if (attrs.ContainsKey(nameof(InputPercentAttribute)))
        {
            return value.ToString() + "%";
        }
        else if (attrs.ContainsKey("SelectControlAttribute"))
        {
            return value.ToString();
        }
        else if (attrs.ContainsKey(nameof(UnitsAttribute)))
        {
            return value.ToString() + attrs[nameof(UnitsAttribute)];
        }
        else if (attrs.ContainsKey(nameof(InputColorAttribute)))
        {
            return value.ToString();
        }
        else
        {
            throw new Exception("Качественно определить специализированный текст пока не удалось.");
        }        
        
    }

    public static JArray ToJArray(dynamic col)
    {
        return (JArray)JObject.FromObject(new { items = col })["items"];
    }
    public static string ToDateString(System.DateTime date)
    {
        string strDay = date.Day < 9 ? "0" + date.Day : date.Day.ToString();
        string strMonth = date.Month < 9 ? "0" + date.Month : date.Month.ToString();
        return $"{date.Year}-{strDay}-{strMonth}";
    }

    internal static Dictionary<string,object> jtokenToDictionary(JToken jobj)
    {
        return JsonConvert.DeserializeObject<Dictionary<string,object>>(jobj.ToString());
    }

    internal static Dictionary<string, object> ToDictionary(object target, string[] options)
    {
        Dictionary<string, object> map = new Dictionary<string, object>();
        foreach(string option in options)
        {
            map[option] = ReflectionService.GetValueFor(target, option);
        }
        return map;
    }

    internal static Dictionary<string, object> ToDictionary(object target)
    {
        Dictionary<string, object> map = new Dictionary<string, object>();
        foreach (string option in ReflectionService.GetOwnPropertyNames(target.GetType()))
        {
            map[option] = ReflectionService.GetValueFor(target, option);
        }
        return map;
    }

    internal static Dictionary<string, object> ToDictionaryLabels(object target)
    {
        Dictionary<string, object> map = new Dictionary<string, object>();
        foreach (string option in ReflectionService.GetOwnPropertyNames(target.GetType()))
        {
            string label = Attrs.LabelFor(target.GetType(), option);
            map[label] = ReflectionService.GetValueFor(target, option);
        }
        return map;
    }


    /// <summary>
    /// Форматирование обьекта в JSON
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public static string Json(object target)
    {
        if (target is string)
        {
            return (string)target;
        }
        else if (target is JObject)
        {
            return ((JObject)target).ToString();
        }
        else
        {
            try
            {
                return JObject.FromObject(target).ToString();
            }
            catch (Exception ex)
            {
                return "Сериализация объекта "+ target + " класса "+ (target!=null? target.GetType().Name: "undefined")+ " прервана: " + ex.Message;
            }
            return null;
        }
    }


    /// <summary>
    /// Форматирование обьекта в XML
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public static string ToXML(object target)
    {            
        XmlSerializer formatter = new XmlSerializer(target.GetType());            
        using (StringWriter writer = new StringWriter())
        {
            formatter.Serialize(writer, target);
            writer.Flush();
            return writer.ToString();
        }                        
    }

    public static string ToQueryString(string url)
    {
        string query = url;
        while (query.IndexOf("/") != -1)
        {
            query = query.Replace("/",".");
        }
        return query;
    }

    internal static Dictionary<string, string> ToDictionaryStringString(Dictionary<string, object> dic)
    {
        Dictionary<string, string> res = new Dictionary<string, string>();
        foreach(var p in dic)
        {
            res[p.Key] = p.Value.ToString();
        }

        return res;

    }

    /// <summary>
    /// Форматирование обьекта в XML
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public static T FromXML<T>(string xml)
    {
        XmlSerializer formatter = new XmlSerializer(typeof(T));
        using (StringReader reader = new StringReader(xml))
        {
            object item = formatter.Deserialize(reader);                 
            return (T)item;
        }
    }
        
    public static string ToJson(object item)
    {
        if (item is JObject) return ((JObject)item).ToString();
        return JsonConvert.SerializeObject(item);
    }

    public static Dictionary<string, object> FromJson(string args)
    {
        return JsonConvert.DeserializeObject<Dictionary<string,object>>(args);
    }

    internal static List<T> ToList<T>(object[] vs)
    {
        var list = new List<T>();
        foreach(var p in vs)
        {
            list.Add((T)p);
        }
        return list;
    }
}
