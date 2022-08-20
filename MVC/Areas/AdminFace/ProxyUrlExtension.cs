using Microsoft.AspNetCore.Builder;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

 

public static class ProxyUrlExtension
{
    public static IApplicationBuilder UseProxyServer( this IApplicationBuilder builder )
    {
        //return builder.UseMiddleware<ProxyComponent>( );             
        return builder;
    }
}

 
