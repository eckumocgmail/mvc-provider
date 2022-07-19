using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class Expressions
{

    
    public static HashSet<string> GetKeywords(IEnumerable<object> items, string entity, string query )
    {
        HashSet<string> keywords = new HashSet<string>();
        List<string> terms = Attrs.GetSearchTerms(entity);
        foreach (var p in items.ToList())
        {
            foreach (string term in terms)
            {
                object val = ReflectionService.GetValueFor(p, term);
                if (val != null)
                {
                    foreach (string s in val.ToString().Split(" "))
                    {
                        keywords.Add(s);
                    }
                }
            }
        }
        return keywords;        
    }

    public static HashSet<object> Search(IEnumerable<object> items, string entity, string query)
    {
        HashSet<object> results = new HashSet<object>();
        List<string> terms = Attrs.GetSearchTerms(entity);
        Func<object, bool> verify = Expressions.ArePropertiesContainsText(terms, query);

        foreach (var p in items.ToList())
        {
            if (verify(p))
            {
                results.Add(p);
            }
        }
        return results;
    }

    public static string GetUniqTextExpressionFor(Type type)
    {
        return GetUniqTextExpressionFor(type, "");
    }


    public static string GetUniqTextExpressionFor(Type type,string prefix)
    {
        string expression = "";
        var attributes = Attrs.ForAllPropertiesInType(type);
        string uniqProperty = Attrs.GetUniqProperty(attributes);
        
        if(uniqProperty == null)
        {            
            foreach (string propertyName in ReflectionService.GetPropertyNames(type))
            {
                if (CoreTyping.IsPrimitive(type, propertyName))
                {
                    expression += "{{" + prefix + propertyName + "}} ";
                }
            }
            
            if (expression.Length > 0)
            {
                expression = expression.Substring(0, expression.Length - 1);
            }            
        }
        else
        {
            return "{{" + prefix + uniqProperty + "}}";
        }
        return ""+expression+"";
    }


    /// <summary>
    /// Проверка наличия значений свойств в тексте
    /// </summary>
    /// <param name="properties"></param>
    /// <param name="text"></param>
    /// <returns></returns>
    public static Func<object, bool> ArePropertiesContainsText(List<string> properties, string text)
    {
        return (p) =>
        {
            if(string.IsNullOrEmpty(text))
            {
                return true;
            }
            foreach (var prop in properties)
            {

                object val = p.GetType().GetProperty(prop).GetValue(p);
                if (val != null)
                {
                    bool validation = val.ToString().ToLower().IndexOf(text) != -1;
                    if (validation) return true;
                }
            }
            return false;
        };
    }

    internal static object GetDefaultBindingsFor(string entity)
    {
        return new Dictionary<string, string>() {
            { "Title", GetUniqTextExpressionFor(ReflectionService.TypeForName(entity)) }
        };

    }
}