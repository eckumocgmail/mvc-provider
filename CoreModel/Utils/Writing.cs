using Microsoft.Extensions.Configuration;

using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;


/// <summary>
/// Реализует методы вывода
/// </summary>
public class Writing
{

    

    public static void ToConsoleJson(object target)
    {
        ToConsole(JObject.FromObject(target).ToString());
    }

    public static void ToConsole(Exception ex)
    {
        Writing.ToConsole("\n\n");
        Exception p = ex;
        while (p != null)
        {
            Writing.ToConsole(p.Message);
            p = p.InnerException;
        }
        Writing.ToConsole("\n\n");
        Writing.ToConsole(ex.StackTrace);
        Writing.ToConsole("\n\n");
    }



    public static void ToConsole(string title, IDictionary<string, object> configuration)
    {
        ToConsole($"\n{title}");
        foreach (var pair in configuration)
        {
            ToConsole($"\t{pair.Key}={pair.Value}");
        }
        ToConsole($"\n");

    }

    public static void ToConsole(string title, IConfiguration configuration)
    {
        ToConsole($"\n{title}");
        IEnumerator<KeyValuePair<string, string>> enumerator = configuration.AsEnumerable().GetEnumerator();
        while (enumerator.MoveNext())
        {
            ToConsole($"\t{enumerator.Current.Key}={enumerator.Current.Value}");
        }
        ToConsole($"\n");

    }



    public static void ToConsole(string message)
    {
        Console.WriteLine(message);
        Debug.WriteLine(message);
    }

    public static void ToConsole(string title, string[] messages)
    {
        ToConsole($"\n{title}");
        foreach (string message in messages)
        {
            ToConsole($"\t {message}");
        }
    }
}
