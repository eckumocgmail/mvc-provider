using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Application.ControllersMVC
{
    
    /// <summary>
    /// Осуществляет навигацию по страницам справочной информации
    /// </summary>
    public class AboutController : PageController
    {
        private readonly ILogger<AboutController> _logger;
        private readonly ApplicationPartManager _partManager;


        public AboutController(
                ILogger<AboutController> logger,     
                ApplicationPartManager partManager,
                UserModelsService models): base(models)
        {
            _logger = logger;      
            _partManager = partManager;
            _logger.LogInformation("Create");
        }


        /// <summary>
        /// Переход к страницы описания разделения ответственности между пользователями
        /// </summary>
        /// <returns></returns>
        public IActionResult Options()
        {
            List<string> properties = new List<string>();
            foreach (var p in GetType().GetFields())
            {
                properties.Add(p.Name);
            }
            foreach (var p in GetType().GetProperties())
            {
                properties.Add(p.Name);
            }
            return Json(new {
                properties = properties
            });
        }


        /// <summary>
        /// Переход к страницы описания разделения ответственности между пользователями
        /// </summary>
        /// <returns></returns>
        public ViewResult SeparationOfResponsibilities()
        {
            return View();
        }


        /// <summary>
        /// Переход к страницы содержащей политику конфиденциальности
        /// </summary>
        /// <returns></returns>
        public ViewResult PrivacyPolicy()
        {            
            return View();
        }


        /// <summary>
        /// Переход к страницы содержащей контактную информацию
        /// </summary>
        /// <returns></returns>
        public ViewResult ContactInformation()
        {
            return View();
        }




        /// <summary>
        /// Переход к страницы содержащей контактную информацию
        /// </summary>
        /// <returns></returns>
        public ViewResult Docs()
        {
            return View();
        }

    }
}
