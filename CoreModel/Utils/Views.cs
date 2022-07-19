public class Views
{
    public static string GetControllerName(Microsoft.AspNetCore.Mvc.Rendering.ViewContext ctx)
    {
        return ctx.RouteData.Values["controller"].ToString()+"Controller";
    }
}