using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

public class ContainerViewComponent : ViewComponent
{
    

    public ContainerViewComponent ()
    {
     
    }

    public IViewComponentResult Invoke(global::ViewItem Model)
    {


        return View("Container", Model);
    }
}