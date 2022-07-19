using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreGenerator
{
    public class CreateDomainModule
    {
        private string _rootDir;

        public CreateDomainModule(string projectRoot)
        {
            _rootDir = projectRoot;
        }

        public void AddArea(string role)
        {
            string areaName = role + "Face";
            mkdir($"{_rootDir}/Areas/{areaName}");
            mkdir($"{_rootDir}/Areas/{areaName}/Controllers");
            mkdir($"{_rootDir}/Areas/{areaName}/Entities");
            mkdir($"{_rootDir}/Areas/{areaName}/Services");
            mkdir($"{_rootDir}/Areas/{areaName}/Views");
            mkdir($"{_rootDir}/Areas/{areaName}/Views/{role}");
            createHomeView($"{_rootDir}/Areas/{areaName}/Views/{role}/{role}Home.cshtml", role);
            createLayoutView($"{_rootDir}/Areas/{areaName}/Views/{role}/{role}Layout.cshtml", role);
            createNavigationView($"{_rootDir}/Areas/{areaName}/Views/{role}/{role}Navigation.cshtml", role);
            createNavigationController($"{_rootDir}/Areas/{areaName}/Controllers/{role}Controller.cs", $"{role}");
        }
 

        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <param name="role"></param>
        private void createNavigationView(string path, string role)
        {
            System.IO.File.WriteAllText(path, @"
                    <nav class='navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3'>
                        <div class='container'>
                            <a class='navbar-brand' asp-area='' asp-controller='Home' asp-action='Index'>"+ role + @"</a>
                            <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='.navbar-collapse' aria-controls='navbarSupportedContent'
                                    aria-expanded='false' aria-label='Toggle navigation'>
                                <span class='navbar-toggler-icon'></span>
                            </button>
                            <div class='navbar-collapse collapse d-sm-inline-flex justify-content-between'>
                                <ul class='navbar-nav flex-grow-1'>

                                    <li class='nav-item'>
                                        <a class='nav-link text-dark' asp-area='' asp-controller='Home' asp-action='Index'>Главная страница</a>
                                    </li>
  

                                </ul>
                            </div>
                        </div>
                    </nav>
            ");
        }

        private void createLayoutView(string path, string role)
        {
            System.IO.File.WriteAllText(path, @"
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@{
    Layout = ""_Layout"";
}

<div>
    <div>
        <partial name = """+role+@"Navigation""/>
    </div>
    <div>
        @RenderBody()
    </div>
</div>
            ");
        }

        private void createHomeView(string path, string role)
        {
            System.IO.File.WriteAllText(path, @"
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@{
    Layout = """ + role + @"Layout"";
}

<div>
 
</div>
            ");
        }

        private void createNavigationController(string path, string role)
        {
            System.IO.File.WriteAllText(path, @"
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

"+$"namespace Areas.{role}Face.Controllers"+@"
{
    [Area("""+ role+@"Face"")]
    public class "+role+ @"Controller : NavigationController
    {
        public " + role + @"Controller(UserModelsService service) : base(service)
        {

        }

        public IActionResult " + role + @"Home()
        {
            return View();
        }
    }
}

            ");

        }

        private void mkdir(string path)
        {
            System.IO.Directory.CreateDirectory(path);
        }
    }
}
