

using Core.Services;
using ApplicationDb.Entities;

using AppAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
 

/// <summary>
/// Служба транспортного уровня, выполняет авторизацию, регистрацию и идентификацияю пользователей
/// </summary>
public class AuthorizationService: RegistrationService, APIAuthorization
{
        
    private User _user;

    private readonly ILogger<AuthorizationService> _logger;
    private readonly APIUsers _users;        
    private readonly ApplicationDbContext _db;
    private readonly CookieManager _cookieManager;

    //public UserMessagesService _messages { get; }

    //private readonly StatisticsService _statistics;
    private readonly AuthorizationOptions _options;
    private readonly IHttpContextAccessor _accessor;
 

    public AuthorizationService(
            CookieManager cookieManager,
           // UserMessagesService messages,
            ILogger<AuthorizationService> logger,
            IHttpContextAccessor accessor,
          //  StatisticsService statistics,
       
            AuthorizationOptions options,
            IEmailService email,
            APIUsers users,
            ApplicationDbContext db ): base(db, options, email) {
        
        _logger = logger;
       // _logger.LogInformation("Created");
        _users = users;            
        _db = db;
        _cookieManager = cookieManager;
       // _messages = messages;
      //  _statistics = statistics;
        _options = options;
        _accessor = accessor;            
    }


    /// <summary>
    /// Метод выхода пользователя из сеанса
    /// </summary>
    public void Signout(bool? IsFront=false)
    {
        if( _options.LogginAuth)               
            _logger.LogInformation("Signout");
        User user = Verify(IsFront);
        lock (_users)
        {
            if (user != null && _users.Has(user.SecretKey))
            {
                _users.Remove(user.SecretKey);
                _db.SaveChanges();
            }
            if (IsFront==false)
            {
                _accessor.HttpContext.Response.Redirect(_options.LoginPagePath);
            }
            
        }            
    }


    /// <summary>
    /// Авторизация пользователя в системе
    /// </summary>
    /// <param name="Email">электронный адрес</param>
    /// <param name="Password">пароль</param>
    public User Signin( string Email, string Password, bool? IsFront=false )
    {

        if (_options.LogginAuth)
            _logger.LogInformation("Signin");
        if( IsSignin())
        {
            User user = Verify();
            lock (_users)
            {
                if (user != null && _users.Has(user.SecretKey))
                {
                    _users.Remove(user.SecretKey);
                    _db.SaveChanges();
                }                
            }
        }

        User current = (from user 
                        in _db.Users
                                .Include(a => a.Account)
                                .Include(a => a.Inbox)
                                .Include(a => a.Settings)
                     
                                .Include(a => a.Person)                                
                                .Include(a => a.Role)
                                .Include(a => a.UserGroups)
                        where user.Account.Email == Email select user).FirstOrDefault();            
        if (current == null || GetHashSha256(Password) != current.Account.Hash)
        {
            if(IsFront == false)
            {
                
                throw new Exception("Учётные данные не зарегистрированы");
            }
            else
            {
                _accessor.HttpContext.Response.Redirect(_options.LoginPagePath);
            }
            
        }
        else
        {
            BusinessResource resource = current.Role;
            while (resource.ParentID!=null)
            {
                resource.Parent = _db.BusinessResources.Find(resource.ParentID);
                resource = resource.Parent;
            }
            


            current.Groups = (from g in _db.Groups where (from p in current.UserGroups select p.GroupID).Contains(g.ID) select g).ToList();
            var userGroupIDs = (from p in current.Groups select p.ID).ToList();
            current.BusinessFunctions = (from p in _db.GroupsBusinessFunctions.Include(b => b.BusinessFunction) where userGroupIDs.Contains(p.GroupID) select p.BusinessFunction).ToList();


 
            _user = current;
            current.Groups = (from grs
                                in _db.Groups
                                where (from ug in current.UserGroups select ug.GroupID).Contains(grs.ID)
                                select grs).ToList();
            string currentKey = _users.Find(current);
            current.SecretKey = currentKey!=null? currentKey: _users.Put(current);
            current.IsActive = true;
            long timestamp = Timing.GetTodayBeginTime();
            _db.SaveChanges();
            _db.LoginFacts.Add(new LoginFact() { 
                Created=DateTime.Now,
                User= current,
                Calendar=   GetTodayCalendar()
            });
            _db.SaveChanges();
            if (_accessor.HttpContext.Response.HasStarted == false)
            {
                _cookieManager.SetCookie(_options.UserCookie, current.SecretKey);
                if (_cookieManager.GetCookie(_options.UserCookie)!= current.SecretKey)
                {
                    throw new Exception("Некорректно работает CookieManager");
                }
            }

        }
        return _user = current;
    }

    private Calendar GetTodayCalendar()
    {
        DateTime p = DateTime.Now;
      
        return new Calendar()
        {
            Day = p.Day,
            Quarter = p.Month < 4 ? 1 : p.Month < 7 ? 2 : p.Month < 10 ? 3 : 4,
            Month = p.Month,
            Week = 1,
            Year = p.Year,
            Timestamp = (long)((new DateTime(p.Year, p.Month, p.Day) - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds)
        };
    }



    /// <summary>
    /// Идентификация пользователя в системе
    /// </summary>
    /// <returns>ссылка на обьект сеанса</returns>
    public User Verify(bool? IsFront = false)
    {
        if (_options.LogginAuth)
            _logger.LogInformation("Verify");
        if ( _user != null)
        {
            return _user;
        }
        string SecretKey = _cookieManager.GetCookie(_options.UserCookie);        
        if(SecretKey == null)
        {
            if (IsFront == false)
            {
                _accessor.HttpContext.Response.Redirect(_options.LoginPagePath);
            }            
            return null;
        }
        else
        {
            User user = _users.Take(SecretKey);
            if (user == null)
            {
                if(_accessor.HttpContext.Response.HasStarted == false)
                {
                    _accessor.HttpContext.Response.Cookies.Delete(_options.UserCookie);
                    if (IsFront == false)
                    {
                        _accessor.HttpContext.Response.Redirect(_options.LoginPagePath);
                    }
                }
            }
            else
            {
                if (_accessor.HttpContext.Response.HasStarted == false)
                {                    
                    _cookieManager.SetCookie(_options.UserCookie, SecretKey);
                }                
            }
            return user;
        }
    }


        


    /// <summary>
    /// Получечние текущего времени в милисекундах
    /// </summary>
    /// <returns></returns>
    private long GetTimestamp()
    {
        return (long)(((DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0))).TotalMilliseconds);
    }




    /// <summary>
    /// Применение функции хэширования к последовательности символов
    /// </summary>
    /// <param name="text">последовательность</param>
    /// <returns>хэш</returns>
    private string GetHashSha256(string text)
    {
        if (_options.LogginAuth)
            _logger.LogInformation("GetHashSha256");
        byte[] bytes = Encoding.Unicode.GetBytes(text);
        SHA256Managed hashstring = new SHA256Managed();
        byte[] hash = hashstring.ComputeHash(bytes);
        string hashString = string.Empty;
        foreach (byte x in hash)
        {
            hashString += String.Format("{0:x2}", x);
        }
        return hashString;
    }


    /// <summary>
    /// Проверка выполнения процедуры авторизации
    /// </summary>
    /// <returns></returns>
    public bool IsSignin()
    {
        if (_options.LogginAuth)
            _logger.LogInformation("IsSignin");
        string SecretKey = _cookieManager.GetCookie(_options.UserCookie);        
        if (SecretKey == null)
        {
            if (_options.LogginAuth)
                _logger.LogInformation("IsSignin = false");
            return false;
        }
        else
        {
            User user = _users.Take(SecretKey);
            if (user == null)
            {
                if (_accessor.HttpContext.Response.HasStarted == false)
                {
                    _accessor.HttpContext.Response.Cookies.Delete(_options.UserCookie);
                }
                if (_options.LogginAuth)
                    _logger.LogInformation("IsSignin = false");
                return false;
            }
            else
            {
                if (_accessor.HttpContext.Response.HasStarted == false)
                {
                    _cookieManager.SetCookie(_options.UserCookie, SecretKey);                    
                }
                if (_options.LogginAuth)
                    _logger.LogInformation("IsSignin = true");
                return true;
            }               
        }

    }


    /// <summary>
    /// Метод получения атрибутов сеанса
    /// </summary>
    /// <returns></returns>
    public ConcurrentDictionary<string, object> Session()
    {
        if (_options.LogginAuth)
            _logger.LogInformation("Session");
        string SecretKey = null;
        _accessor.HttpContext.Request.Cookies.TryGetValue(_options.UserCookie, out SecretKey);
        if (SecretKey == null)
        {
            return null;
        }
        else
        {
            ConcurrentDictionary<string, object> session = _users.GetSession(SecretKey);
            if (session == null)
            {
                _accessor.HttpContext.Response.Cookies.Delete(_options.UserCookie);
            }
            else
            {
                if (_accessor.HttpContext.Response.HasStarted == false)
                {                    
                    _cookieManager.SetCookie(_options.UserCookie, SecretKey);
                }
                
            }
            return session;
        }
    }



    /// <summary>
    /// Проверка принадлежности пользователя к роли
    /// </summary>
    /// <param name="roleName">наменование роли</param>
    /// <returns></returns>
    public bool InRole(string roleName)
    {
        if (_options.LogginAuth)
            _logger.LogInformation("InRole");
        User user = this.Verify();
        if (user == null)
        {
            return false;
        }
        else
        {
            BusinessResource prole = user.Role;
            while( prole != null)
            {
                if (prole.Code == roleName)
                {
                    return true;
                }
                if( prole.ParentID == null)
                {
                    break;
                }
                else
                {
                    if(prole.ParentID == prole.ID)
                    {
                        break;
                    }
                    prole = _db.BusinessResources.Find((int)prole.ParentID);
                }
            }
            return false;
        }
    }


    /// <summary>
    /// Проверка активации учетной записи
    /// </summary>
    /// <returns></returns>
    public bool IsActivated()
    {
        _logger.LogInformation("IsActivated");
        User user = Verify();
        if( user == null)
        {
            return false;
        }
        else
        {
            return _db.Accounts.Find(user.Account.ID).Activated != null;
        }
    }

    public User Signin(string RFIDLabel)
    {
        if (_options.LogginAuth)
            _logger.LogInformation("Signin");
        if (IsSignin())
        {
            Signout();
        }

        User current = (from user
                        in _db.Users
                            .Include(a => a.Account)
                            .Include(a => a.Settings)
                            .Include(a => a.Person)
                            .Include(a => a.Role)
                            .Include(a => a.UserGroups)
                        where user.Account.RFID == RFIDLabel
                        select user).FirstOrDefault();
        if (current == null )
        {
            throw new Exception("Учетные данные не зарегистрированы");
        }
        else
        {
            _user = current;
            current.Groups = (from grs
                                in _db.Groups
                                where (from ug in current.UserGroups select ug.GroupID).Contains(grs.ID)
                                select grs).ToList();
            string currentKey = _users.Find(current);
            current.SecretKey = currentKey != null ? currentKey : _users.Put(current);
            current.IsActive = true;
            long timestamp = Timing.GetTodayBeginTime();
            _db.SaveChanges();
            _db.LoginFacts.Add(new LoginFact()
            {
                Created = DateTime.Now,
                User = current,
                Calendar = (from cal in _db.Calendars where cal.Timestamp == timestamp select cal).First()
            });
            _db.SaveChanges();
            _cookieManager.SetCookie(_options.UserCookie, current.SecretKey);            
            return current;
        }
            
    }

     
}

