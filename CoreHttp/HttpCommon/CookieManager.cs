using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using System.Collections.Concurrent;

public class CookieManager
{
    private readonly IHttpContextAccessor _accessor;
    private readonly ILogger<CookieManager> _logger;
    private readonly ConcurrentDictionary<string, string> _cookies;

    public CookieManager(ILogger<CookieManager> logger, IHttpContextAccessor accessor)
    {
        _logger = logger;
        _cookies = new ConcurrentDictionary<string, string>();
        _accessor = accessor;
        foreach (var cookie in _accessor.HttpContext.Request.Cookies)
        {
            _cookies[cookie.Key] = cookie.Value;
        }
    }

    public string SetCookie(string key, string value)
    {
        
        _logger.LogInformation("SetCookie");
        if (_accessor.HttpContext.Response.HasStarted == false)
        {
            _accessor.HttpContext.Response.Cookies.Append(key, value);
            _cookies[key] = value;
        }

        return value;
    }

    public string GetCookie(string key)
    {
        foreach (var cookie in _accessor.HttpContext.Request.Cookies)
        {
            _cookies[cookie.Key] = cookie.Value;
        }
        _logger.LogInformation("GetCookie");
        if (_cookies.ContainsKey(key))
            return _cookies[key];
        else return null;
    }

    public void RemoveCookie(string cookies)
    {
 
        _logger.LogInformation("RemoveCookie");
        _accessor.HttpContext.Response.Cookies.Delete(cookies);
    }
}