using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
 
using System.Collections.Generic;
using ProxyGateway.Middleware;
using ProxyGateway;
using System.Linq;
using System.Diagnostics;

public class ProxyComponent
{    

    private readonly RequestDelegate _next;


    public ProxyComponent( RequestDelegate next  )  
    {
        this._next = next;
    }


    private void Info(object message) {
        Console.WriteLine($"[" + nameof(ProxyComponent) + $"]: {message}");
        Debug.WriteLine($"[" + nameof(ProxyComponent) + $"]: {message}");
    }


    public ProxyDataModel Find(string path, AdminDbContext _context)
    {
        
        if (path == null || path == "/")
        {
            Info($"{path} NOT FOUND");
            return null;
        }
        
        List<ProxyDataModel> result = (from p in _context.ProxyUrlSegments where p.Path==path select p).ToList();
        if (result.Count() > 1)
        {
            throw new Exception($"Таблица маршрутизации сопоставляет несколько URL для маршрута {path}");
        }
        else
        {
            return result.FirstOrDefault();
        }
    }


    public async Task Invoke(HttpContext httpContext, AdminDbContext _context, IHttpClientFactory factory )
    {
        try
        {
            string query = httpContext.Request.Path.ToString();
            ProxyDataModel segment = Find(query, _context);
            if (segment == null)
            {
                Debug.WriteLine($"{query}=>commit");
                await _next.Invoke(httpContext);
                return;
            }

            var client = factory.CreateClient();
            if (false)
            {
                DataRequestMessage request = HttpContextHelp.ToRequestMessage(httpContext);
                DataResponseMessage response = new DataResponseMessage();
                string redirectUrl =
                    request.ActionName.Length == segment.Path.Length ? "" :
                    request.ActionName.Length == segment.Path.Length + 1 ? "" :
                    request.ActionName.Substring(segment.Path.Length);
                redirectUrl = segment.URL + redirectUrl + HttpContextHelp.ToQueryString(request.MessageObject);

                Console.WriteLine("перенаправление: " + redirectUrl);
                //response.confirmed = false;



                HttpResponseMessage httpResponse = client.GetAsync(redirectUrl).Result;
                try
                {
                    httpResponse.EnsureSuccessStatusCode();
                    response.Confirmed = true;
                    response.MessageObject = Newtonsoft.Json.JsonConvert.DeserializeObject(
                        httpResponse.Content.ReadAsStringAsync().Result);
                }
                catch (Exception ex)
                {
                    response.Confirmed = false;
                    Console.WriteLine(ex.Message);
                }
                if (response.Confirmed)
                {
                    await httpContext.Response.WriteAsync(JObject.FromObject(response).ToString());
                }
                else
                {
                    await _next.Invoke(httpContext);
                }
            }
            else
            {
                Info($"GET {segment.Path}");

                var response = client.GetAsync(segment.URL).Result;
                httpContext.Response.ContentType = "text/html";
                response.EnsureSuccessStatusCode();

                Info($"OK {segment.Path}");
                var responseText = response.Content.ReadAsStringAsync().Result;
               // await httpContext.Response.WriteAsync(@"<div class=""alert alert-info"">OK</div>");
                await httpContext.Response.WriteAsync(responseText);


                Info($"OK {responseText}");
                return;
                //await _next.Invoke(httpContext);
            }
        }catch(Exception ex)
        {
            httpContext.Response.StatusCode = 500;
            httpContext.Response.ContentType = "text/html";
            //httpContext.Response.Redirect("/PortalHome/Error?Message="+ex.Message);
            await httpContext.Response.WriteAsync(@"<div class=""alert alert-danger"">"+ex.Message +"</div>");
        }

            
    }

                        
}
 