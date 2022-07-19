using System;

using ApplicationModel.ApplicationModel;

using ApplicationMVC.Views.Account;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;
 

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

    
    public AccountController(
            IEmailService email,
            UserModelsService models,
            ApplicationDbContext db,
            AuthorizationOptions options,
            APIAuthorization authorization,
            SessionTransientService<ViewContextDefault> request,
            INotificationsService user):base(models)
    {
        _request = request;
        _authorization = authorization;
        _notifications = user;
        _db = db;
        _email = email;
        _options = options;
    }


    /// <summary>
    /// Быстрый вход
    /// </summary>
    /// <returns></returns>
    
    public IActionResult LoginAsUser()
    {
        
        ApplicationDb.Entities.User user = _authorization.Signin("eckumoc@gmail.com", "Z6TcpJ07j0");
        bool signed = _authorization.IsSignin();
        if (signed)
        {
            return Redirect("/Home/Index");
            //return Redirect("/UserFace/User/UserHome");
        }
        else
        {
            return RedirectToAction(_options.LoginPagePath);
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


    /// <summary>
    /// Выполнение процедуры активации учетной записи
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
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
                    $"<p>Ваш код активации: <b>{activationKey}</b></p>"
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
            return View(model);
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
                        return View(model);
                    }
                        
                }
               
                model.ErrorMessage = "Авторизация не выполнена";
                TempData["recaptcha"] = "Подтвердите что Вы не робот";
                return View(model);
                

            }
            catch (Exception ex)
            {
                model.ErrorMessage = "Авторизация не выполнена. " + ex.Message;
                return View(model);
            }
        }


    }
}
