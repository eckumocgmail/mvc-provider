
using AppAPI;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

/// <summary>
/// Компонент промежуточного ПО выполняет ограничение доступа пользователей на уровне маршрутов
/// по результатам проверки авторизации и принадлежности пользователя к той или иной роли.
/// Сущность РОЛЬ имеет иерархическую структуру права доступа наследуются от родительской роли к потомку
/// </summary>
public class CanActivateComponent
{
    private readonly ILogger<CanActivateComponent> _logger;
 
    private readonly RequestDelegate _next;


    public CanActivateComponent(ILogger<CanActivateComponent> logger, RequestDelegate next )
    {
        _logger = logger;
           
        _next = next;
    }

    public async Task Invoke(HttpContext http, APIAuthorization authorization,   AuthorizationOptions _options)
    {

        string path = http.Request.Path.ToString();
        
        _logger.LogInformation(path);
        try
        {
            
            // страница активации доступа только авторизованным пользователям,
            // остальные перенаправляются на страницу авторизации
            if (path.StartsWith(_options.ActivationRequirePath))
            {
                if (authorization.IsSignin() == false)
                {
                    _logger.LogInformation($"denied request to: {path}");
                    //user.Error("Доступ запрещён");
                    http.Response.Redirect(_options.LoginPagePath);
                    return;
                }
                else
                {
                    if (authorization.IsActivated() == false)
                    {
                        _logger.LogInformation($"commit request to: {path}");
                        await _next.Invoke(http);
                        return;
                    }
                    else
                    {
                        /*user.AddNotification(new NotificationMessage()
                        {
                            Type = "Warning",
                            Title = "Активация учетной записи уже выполнена, повторять эту процедуру не следует"
                        });*/
                        http.Response.Redirect("/Home/News");
                        return;
                    }
                }
            }
        }catch(Exception ex)
        {
            WriteError(http, ex);
        }




        try
        {
            // фильтрация запросов пользователей не принадлежащих к заданным ролям
            foreach (var pair in _options.RoleValidationRoutes)
            {
                string roleName = pair.Key;
                foreach (string rolePath in pair.Value)
                {
                    if (path.StartsWith(rolePath))
                    {
                        if (authorization.IsSignin() && authorization.IsActivated() == false)
                        {
                            if (!path.StartsWith(_options.ActivationRequirePath))
                            {
                                _logger.LogInformation($"denied request to: {path}");
                               
                                http.Response.Redirect(_options.ActivationRequirePath);
                                return;
                            }
                        }
                        else
                        {

                            if (authorization.InRole(roleName) == false)
                            {
                                _logger.LogInformation($"denied request to: {path}");
                                //user.Error("Доступ запрещён");
                                http.Response.Redirect(_options.LoginPagePath);
                                return;
                            }
                        }

                    }
                }
            }
            _logger.LogInformation($"commit request to: {path}");
        }
        catch(Exception ex)
        {
            WriteError(http,ex);
        }
        try
        {
            await _next.Invoke(http);
        }
        catch(Exception ex)
        {
            WriteError(http,ex);
        }
    }

    private void WriteError(HttpContext http, Exception ex) {
        http.Response.StatusCode = 500;
        http.Response.WriteAsync("<div class='alert alert-error'>" + ex.Message + "</div>");
        http.Response.WriteAsync("<div class='alert alert-warning'>" + ex.StackTrace + "</div>");
    }
}
