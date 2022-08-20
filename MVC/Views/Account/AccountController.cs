using System;
using System.Linq;
using System.Runtime.CompilerServices;

using ApplicationModel.ApplicationModel;

using ApplicationMVC.Views.Account;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

public class AccountController : PageController
{
    private readonly SessionTransientService<ViewContextDefault> _request;
    private readonly APIAuthorization _authorization;
    private readonly INotificationsService _notifications;
    private readonly ApplicationDbContext _db;
    private readonly IEmailService _email;
    private readonly AuthorizationOptions _options;
    private readonly bool EnableEmailService = true;
    private readonly bool EnableRecaptcha = true;

    public IEmailService email { get; set; }
    public UserModelsService models { get; set; }
    public ApplicationDbContext db { get; set; }
    public AuthorizationOptions options { get; set; }
    public APIAuthorization authorization { get; set; }
    public SessionTransientService<ViewContextDefault> request { get; set; }
    public INotificationsService user { get; set; }
    public AccountController(IServiceProvider serviceProvider):base(serviceProvider)
    {
        _request = request = serviceProvider.GetService<SessionTransientService<ViewContextDefault>>();
        _authorization = authorization = serviceProvider.GetService<APIAuthorization>();
        _notifications = user = serviceProvider.GetService<INotificationsService>();
        _db = db = serviceProvider.GetService<ApplicationDbContext>();
        _email = email = serviceProvider.GetService<IEmailService>();
        _options = options = serviceProvider.GetService<AuthorizationOptions>();
    }


    /// <summary>
    /// Быстрый вход
    /// </summary>
    /// <returns></returns>
    
    public IActionResult LoginAsUser()
    {

        if (_authorization.HasUserWithEmail("eckumoc@gmail.com") == false)
        {
            _authorization.Signup("eckumoc@gmail.com", "eckumoc@gmail.com", 
                "eckumoc@gmail.com", "Батов", "Константин", "Александрович", 
                DateTime.Parse("26.08.1989"), "7-904-334-1124");
            _db.Accounts.Find(_authorization.GetUserByEmail("eckumoc@gmail.com").AccountID).Activated = DateTime.Now;
            _db.SaveChanges();
        }
        
        bool signed = _authorization.IsSignin();
        if (signed)
        {
            if (_authorization.Verify().Account.Activated == null)
            {
                _authorization.Verify().Account.Activated = DateTime.Now;
            }
            return Redirect(_options.PersonPagePath);
        }
        else
        {
            

            return Redirect($"/Account/Auth?Email=eckumoc@gmail.com&&Password=eckumoc@gmail.com");
            /*_authorization.Signin("eckumoc@gmail.com", "eckumoc@gmail.com");
            return RedirectToAction(_options.LoginPagePath);*/
        }

    }


    /// <summary>
    /// Переход на страницу активации учетной записи
    /// </summary>
    /// <returns></returns>
    public IActionResult ActivationRequire()
    {
        ApplicationDb.Entities.User user = _authorization.Verify();
        if (user != null)
        {
            if (_authorization.IsActivated() == false)
            {
                return View(new ActivationRequireViewModel()
                {
                    Email = user.Account.Email
                });
            }
            else
            {
                return RedirectToAction("News", "Home");
            }
        }
        else
        {
            return RedirectToAction("Login");
        }
    }


    public IActionResult Activate(string ActivationKey, string Email)
    {
        
        return ActivationRequire(new ActivationRequireViewModel() { 
            Email = Email,
            ActivationKey = ActivationKey
        });
    }

    /// <summary>
    /// Выполнение процедуры активации учетной записи
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    //http://localhost:5000/Account/Activate?ActivationKey={ActivationKey}&&Email={Email}
    public IActionResult ActivationRequire([Bind("Email,ActivationKey")] ActivationRequireViewModel model)
    {
        ApplicationDb.Entities.User user = _authorization.Verify();
        if (user != null)
        {
            if (_db.Accounts.Find(user.Account.ID).ActivationKey == model.ActivationKey)
            {
                _authorization.Verify().Account.Activated = _db.Accounts.Find(user.Account.ID).Activated = DateTime.Now;
                _db.SaveChanges();
                return View("ActivationComplete");
            }
            else
            {
                return View(model);
            }

        }
        else
        {
            return View(new ActivationRequireViewModel()
            {
                Email = model.Email
            });
        }

    }


    /// <summary>
    /// Отправка сообщения с кодом активации на электронную почту
    /// </summary>
    /// <returns></returns>
    public IActionResult SendActivationKey()
    {
        ApplicationDb.Entities.User user = _authorization.Verify();
        if (user != null)
        {
            if (EnableEmailService)
            {
                string baseUrl = GetBaseUrl();
                string activationKey = _authorization.GenerateActivationKey(_options.KeyLength);
                _db.Accounts.Find(user.AccountID).ActivationKey = activationKey;
                _db.SaveChanges();
                _email.SendEmail(user.Account.Email,
                    "Активация учетной записи",
                    $"<p>Ваш код активации: <b>{activationKey}</b></p>"+
                    @"<a href="""+ $"http://localhost:5000/Account/Activate?ActivationKey={activationKey}&&Email={user.Account.Email}" + @""">Завершить активацию<a>"
                );
                return View("ActivationRequire", new ActivationRequireViewModel()
                {
                    Email = user.Account.Email,
                    Message = $"Код активации отправлен на {user.Account.Email}"
                });

            }
            else
            {

                string activationKey = _authorization.GenerateActivationKey(_options.KeyLength);
                _db.Accounts.Find(user.AccountID).ActivationKey = activationKey;
                _db.SaveChanges();

                return View("ActivationRequire", new ActivationRequireViewModel()
                {
                    Email = user.Account.Email,
                    Message = $"Код активации {activationKey}"
                });

            }
        }
        else
        {
            return View("ActivationRequire", new ActivationRequireViewModel()
            {
                Email = user.Account.Email,
                Message = "Не удалось отправить код активации"
            });

        }
    }


    /// <summary>
    /// Выход пользователя из системы
    /// </summary>
    /// <returns></returns>
    public IActionResult Logout()
    {
        _authorization.Signout();
        _request.OnSignout();
        return RedirectToAction("Login", "Account");
    }


    /// <summary>
    /// Переход на страницу восстановления доступа к учетной записи
    /// </summary>
    /// <returns></returns>
    public IActionResult Restore()
    {
        return View(new RestoreModel());
    }


    /// <summary>
    /// Запрос на восстановления доступа к учетной записи
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    public IActionResult Restore([Bind("Email")] RestoreModel model)
    {
        if (!ModelState.IsValid)
        {
            foreach (var state in ModelState)
            {
                switch (state.Key)
                {
                    case "Email": model.EmailValidationState = GetValidationState(state.Key); break;
                }
            }
            return View(model);
        }
        try
        {
            try
            {
                _authorization.RestorePasswordByEmail(model.Email);
                return View("RestoreSuccess", model);
            }
            catch (Exception ex)
            {
                model.ErrorMessage = ex.Message;
                return View("Restore", model);
            }
        }
        catch (Exception ex)
        {
            model.ErrorMessage = "Авторизация не выполнена. " + ex.Message;
            return View(model);
        }
    }


    /// <summary>
    /// Активация учетной записи
    /// </summary>
    /// <param name="id">ключ активации</param>
    /// <returns></returns>
    public IActionResult Activate([FromRoute] string id)
    {
        string activationKey = id;
        ApplicationDb.Entities.User user = _authorization.Verify();
        if (user != null)
        {
            if (_db.Accounts.Find(user.Account.ID).ActivationKey == id)
            {
                _db.Accounts.Find(user.Account.ID).Activated = DateTime.Now;
                _db.SaveChanges();
            }
            return View("ActivationComplete");
        }
        else
        {
            return View();
        }
    }


    /// <summary>
    /// Переход на страницу регистрации пользователя
    /// </summary>
    /// <returns></returns>
    public ViewResult Registration()
    {
        return View(new RegistrationModel()
        {
            Email = "eckumoc@gmail.com",
            Password = "sgdf1423",
            Confirmation = "sgdf1423",
            SurName = "Батов",
            FirstName = "Константин",
            LastName = "Александрович",
            Birthday = DateTime.Parse("26.08.1989"),
            Tel = "7-904-334-1124"
        });
    }



    /// <summary>
    /// Запрос регитсрации учетной записи пользователя
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    public IActionResult Registration([Bind("Email,Password,Confirmation,FirstName,LastName,SurName,Birthday,Tel")] RegistrationModel model)
    {
        if (model.Birthday.Year < 1920)
        {
            model.ErrorMessage = "Регистрация не выполнена";
            ModelState.AddModelError("Birthday", "Дата рождения указана неверно");
            return View(model);
        }
        if (model.Confirmation != model.Password)
        {
            model.ErrorMessage = "Регистрация не выполнена";
            ModelState.AddModelError("Confirmation", "Подтверждение пароля отличается от самого пароля");
            return View(model);
        }
        if (_authorization.HasUserWithEmail(model.Email) == true)
        {
            model.ErrorMessage = "Регистрация не выполнена";
            ModelState.AddModelError("Email", "Данный электронный адрес уже зарегистрирован");
            return View(model);
        }
        if (_authorization.HasUserWithTel(model.Tel) == true)
        {
            model.ErrorMessage = "Регистрация не выполнена";
            ModelState.AddModelError("Tel", "Данный номер телефона уже зарегистрирован");
            return View(model);
        }
        if (!ModelState.IsValid)
        {
            foreach (var state in ModelState)
            {
                switch (state.Key)
                {
                    case "SurName": model.SurNameValidationState = GetValidationState(state.Key); break;
                    case "Last": model.LastNameValidationState = GetValidationState(state.Key); break;
                    case "First": model.FirstNameValidationState = GetValidationState(state.Key); break;
                    case "Birthday": model.BirthdayValidationState = GetValidationState(state.Key); break;
                    case "Email": model.EmailValidationState = GetValidationState(state.Key); break;
                    case "Password": model.PasswordValidationState = GetValidationState(state.Key); break;
                    case "Confirmation": model.ConfirmationValidationState = GetValidationState(state.Key); break;
                    case "Tel": model.TelValidationState = GetValidationState(state.Key); break;

                }
            }
            return View(model);
        }
        try
        {
            string EncodedResponse = Request.Form["g-Recaptcha-Response"];
            bool IsCaptchaValid = EnableRecaptcha ? ((ReCaptchaClass.Validate(EncodedResponse) == "true") ? true : false) : true;
            if (IsCaptchaValid)
            {
                _authorization.Signup(model.Email, model.Password, model.Confirmation, model.FirstName, model.LastName, model.SurName, model.Birthday, model.Tel);

                string baseUrl = GetBaseUrl();
                string activationKey = _authorization.GenerateActivationKey(_options.KeyLength);
                _authorization.GetUserByEmail(model.Email).Account.ActivationKey = activationKey;
                _db.SaveChanges();
                if (this.EnableEmailService)
                {
                    _email.SendEmail(model.Email,
                        "Активация учетной записи",
                        $"<p>Ваш код активации: <b>{activationKey}</b></p>"
                    );

                }
                return View($"RegistrationComplete", model);
            }
            else
            {
                model.ErrorMessage = "Регистрация не выполнена";
                TempData["recaptcha"] = "Подтвердите что Вы не робот";
                return View(model);
            }
        }
        catch (Exception ex)
        {

            model.ErrorMessage = ex.Message;
            while (ex.InnerException != null)
            {
                ex = ex.InnerException;
                model.ErrorMessage += " " + ex.Message;
            }
            return View(model);
        }
    }


    /// <summary>
    /// Получение URL-адреса приложения
    /// </summary>
    /// <returns></returns>
    private string GetBaseUrl()
    {
        string url = _options.ApplicationUrl + HttpContext.Request.Path.ToString();
        int commaIndex = url.IndexOf(":");
        int serverNameBeginIndex = commaIndex + 3;
        int increase = url.Substring(serverNameBeginIndex).IndexOf("/");
        return url.Substring(0, serverNameBeginIndex + increase);
    }


    /// <summary>
    /// Переход на страницу информирования об успешной регистрации
    /// </summary>
    /// <returns></returns>
    public IActionResult RegistrationComplete()
    {
        return View();
    }


    /// <summary>
    /// Получение статуся проверки свойства модели
    /// </summary>
    /// <param name="property"></param>
    /// <returns></returns>
    public string GetValidationState(string property)
    {
        string state = ModelState[property] == null ? "valid" :
            ModelState[property].ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Valid == true ? "valid" : "invalid";
        return state;
    }


    /// <summary>
    /// Переход на страницу авторизации пользователя
    /// </summary>
    /// <returns></returns>
    public ViewResult Login()
    {
        return View(new LoginModel()
        {
            Email = "eckumoc@gmail.com",
            Password = "9quChq28Im"
        });
    }


    public IActionResult Auth(string Email, string Password)
    {
        ApplicationDb.Entities.User user = _authorization.Signin(Email, Password);
        if (user != null)
        {
            _notifications.Info("Выполнен авторизованный вход в систему");
            return Redirect(user.GetUserHomeUrl());
        }
        else
        {

            return RedirectToAction("Login","Account");
        }
    }

    /// <summary>
    /// Запрос авторизации пользователя
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    public IActionResult Login([Bind("Email,Password")] LoginModel model)
    {
 
        if (!ModelState.IsValid)
        {
            foreach (var state in ModelState)
            {
                switch (state.Key)
                {
                    case "Email": model.EmailValidationState = GetValidationState(state.Key); break;
                    case "Password": model.PasswordValidationState = GetValidationState(state.Key); break;
                }
            }
            model.ErrorMessage = "Авторизация не выполнена";
            return View("Login",model);
        }
        else
        {
            
            try
            {
                
                string EncodedResponse = Request.Form["g-Recaptcha-Response"];
                bool IsCaptchaValid = EnableRecaptcha ? ((ReCaptchaClass.Validate(EncodedResponse) == "true") ? true : false) : true;
                
                if (IsCaptchaValid)
                {
                  
                    ApplicationDb.Entities.User user = _authorization.Signin(model.Email, model.Password);
                    if (user != null)
                    {
                        _notifications.Info("Выполнен авторизованный вход в систему");
                        return Redirect(user.GetHomeUrl());
                    }
                    else
                    {
                        model.Email = "123";
                           model.ErrorMessage = "Авторизация не выполнена";
                        return View("Login", model);
                    }
                        
                }
               
                model.ErrorMessage = "Авторизация не выполнена";
                TempData["recaptcha"] = "Подтвердите что Вы не робот";
                return View("Login", model);
                

            }
            catch (Exception ex)
            {
                model.ErrorMessage = "Авторизация не выполнена. " + ex.Message;
                return View("Login", model);
            }
        }


    }
}
