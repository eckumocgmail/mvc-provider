using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;


public class LoginModel
{
    [BindProperty]
    public string ErrorMessage { get; set; }

    [JsonProperty("g-Recaptcha-Response")]
    public string RecaptchaResponse { get; set; }
    


    [BindProperty]
    [Display(Name = "Электронный адрес")]
    [DataType(
        DataType.EmailAddress,
        ErrorMessage = "Электронный адрес задан некорректно"
    )]
    [NotNullNotEmptyAttribute( "Не указан электронный адрес")]
    public string Email { get; set; } = "Admin@eckumoc.com";

    [BindProperty]
    public string EmailValidationState { get; set; }


    [BindProperty]
    [Display(Name = "Пароль для входа")]
    [DataType(DataType.Password)]
    [NotNullNotEmpty( "Не задан пароль для входа")]
    [MinLength(8, ErrorMessage = "Для пароля должна быть не менее 8 символов")]
    public string Password { get; set; } = "eckumoc@gmail.com";

    [BindProperty]
    public string PasswordValidationState { get; set; }


    public override string ToString()
    {
        return JsonConvert.SerializeObject(this);
    }
}
