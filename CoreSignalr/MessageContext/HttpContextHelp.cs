 

using Microsoft.AspNetCore.Http;
 
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class HttpContextHelp
{


    /// <summary>
    /// Извлечение модели запроса
    /// </summary>
    /// <param name="httpContext"> контекст протокола </param>
    public static DataRequestMessage ToRequestMessage(HttpContext httpContext)
    {

        DataRequestMessage Request = new DataRequestMessage();
        Request.ActionName = httpContext.Request.Path.Value.ToString();        
        Request.MessageObject = GetHttpParams(httpContext);
        return Request;
    }


    /// <summary>
    /// Метод сериализации парамтеров в строку запроса
    /// </summary>
    /// <param name="Params"></param>
    /// <returns></returns>
    public static string ToQueryString(Dictionary<string, object> Params)
    {
        string QueryString = "";
        foreach (var Entry in Params)
        {
            Type Type = Entry.GetType();
            QueryString += $"{Entry.Key}={Entry.Value}&";
        }
        return QueryString.Length > 0 ? "?" + QueryString : "";
    }


    /// <summary>
    /// Извлечение параметров запроса и контекста
    /// </summary>
    /// <param name="Http"> контекст протокола </param>
    /// <returns></returns>
    public static Dictionary<string, object> GetHttpParams(HttpContext Http)
    {
        Dictionary<string, object> pars = new Dictionary<string, object>();
        foreach (var Entry in Http.Request.Query)
        {
            pars[Entry.Key] = Entry.Value;
        }
        return pars;
    }


    /// <summary>
    /// Считывание бинарных данных в основном блоке сообщения
    /// </summary>
    /// <param name="httpContext"> контекст протокола </param>
    /// <returns></returns>
    public static async Task<byte[]> ReadRequestBody(HttpContext httpContext)
    {
        long? length = httpContext.Request.ContentLength;
        if (length != null)
        {
            byte[] data = new byte[(long)length];
            await httpContext.Request.Body.ReadAsync(data, 0, (int)length);
            string mime = httpContext.Request.ContentType;
            return data;
        }
        return new byte[0];
    }
}