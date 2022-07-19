using ApplicationDb.Entities;
using System.Collections.Generic;


    /// <summary>
    /// Параметры жизненого цикла обьектов сеанса
    /// </summary>
    public class AuthorizationOptions
    {
        public bool LogginAuth { get; set; }
        public long SessionTimeout { get; set; }
        public int KeyLength { get; set; }
        public string UserCookie { get; set; }
        public string ServiceCookie { get; set; }
        public int CheckTimeout { get; set; }
        public string ApplicationUrl { get; set; }

        /// <summary>
        /// Роль пользователя по умолчанию,
        /// присваивается пользователям после 
        /// проведеня процедуры регистрации
        /// </summary>
        public string PublicRole { get; set; }
        public string PublicGroup { get; set; }
        

        public AuthorizationOptions()
        {
            this.LogginAuth = true;
            this.SessionTimeout = 1000000;
            this.KeyLength = 32;
            this.UserCookie = "UserKey";
            this.ServiceCookie = "ServiceKey";
            this.CheckTimeout = 1000;
            this.PublicRole = "User";
            this.PublicGroup = "User";            
        }

        /// <summary>
        /// Страница авторизации
        /// </summary>
        public string HomePagePath { get; set; } = "/Home/Index";
        public string LoginPagePath { get; set; } = "/Account/Login";

        /// <summary>
        /// Страница активации учетной записи
        /// </summary>
        public string ActivationRequirePath { get; set; } = "/Account/ActivationRequire";


        /// <summary>
        /// Маршруты только для авторизованных пользователей
        /// </summary> 
 

        public Dictionary<string, List<string>> RoleValidationRoutes
            = new Dictionary<string, List<string>>() {
                { "User", new List<string>{ "/UserFace" } },
                { "Admin", new List<string>{ "/AdminFace" } },
                { "Boss", new List<string>{ "/BossFace" } },
                { "Customer", new List<string>{ "/CustomerFace" } },
                { "Reception", new List<string>{ "/ReceptionFace" } },
                { "Support", new List<string>{ "/SupportFace" } },
                { "Worker", new List<string>{ "/WorkerFace" } },
                { "Developer", new List<string>{ "/DeveloperFace" } },
        };
    }
