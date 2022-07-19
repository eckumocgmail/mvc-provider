 
using Microsoft.AspNetCore.Http;
using System;


public class SessionTransientService<ViewContextDefault> where ViewContextDefault: IDisposable
{
    private const string COOKIE_KEY = "SesionID";

    private readonly CookieManager _cookiesManager;
    private readonly SessionSingletonService<ViewContextDefault> _application;
    private readonly IHttpContextAccessor _http;


    public SessionTransientService(CookieManager cookiesManager, SessionSingletonService<ViewContextDefault> application, IHttpContextAccessor http )
    {
        _cookiesManager = cookiesManager;
        _application = application;
        _http = http;      
    }

    public SessionSingletonService<ViewContextDefault> GetSessionManager()
    {
        return _application;
    }


    public ViewContextDefault GetRoot()
    {
        return GetSession().GetRoot();
    }


    private string GetIpAddress()
    {
        return _http.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
    }


    public SessionContext<ViewContextDefault> GetSession()
    {
        string ip = GetIpAddress();
        string id = Identify();
        SessionContext<ViewContextDefault> session = _application.GetById( id );
        if( session.ip == null)
        {
            session.ip = ip;
        }
        else
        {
            if( session.ip != ip)
            {
                //throw new Exception($"IP-адрес изменился c {session.ip} на {ip}"); 
                //Writing.ToConsole($"IP-адрес изменился c {session.ip} на {ip}");
            }
        }
        return session;
    }


    public string Identify()
    {
        string sessionId = _cookiesManager.GetCookie(COOKIE_KEY);
        if(string.IsNullOrEmpty(sessionId)==false)
        {
            return sessionId;
        }
        else
        {
            string id = CreateId();
            _cookiesManager.SetCookie(COOKIE_KEY, id);
            return id;
        }
    }


    private string CreateId()
    {
        string id = CreateRandomId();
        while( _application.ContainsKey(id))
        {
            id = CreateRandomId();
        }
        return id;
    }


    private string CreateRandomId()
    {
        string id = "";
        Random random = new Random();
        while (id.Length != 10)
        {
            id+=Math.Floor(random.NextDouble() * 10).ToString();
        }
        return id;
    }

    public void OnSignout()
    {
        string cookies = _cookiesManager.GetCookie(COOKIE_KEY);
        _application.Invalidate(cookies);
        _cookiesManager.RemoveCookie(cookies);
    }
}
