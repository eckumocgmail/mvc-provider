using ApplicationDb.Entities;

using AppAPI;
using Microsoft.Extensions.Logging;


/// <summary>
/// Служба уровня приложения, содержит пользователей сеансов
/// </summary>
public class AuthorizationUsers: AuthorizationCollection<User>, APIUsers
{
    public AuthorizationUsers( ILogger<AuthorizationUsers> logger, AuthorizationOptions options ): base( logger, options){}
}

