using CoreModel;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationMVC.Views.Account
{
    
    public class RegistrationModel: BaseEntity
    {
        [BindProperty]
        public string ErrorMessage { get; set; }


        [BindProperty]
        [DisplayName("Электронный адрес")]
        [DataType(
            DataType.EmailAddress,
            ErrorMessage = "Электронный адрес задан некорректно"
        )]
        [NotNullNotEmptyAttribute( "Не указан электронный адрес")]
        public string Email { get; set; }

        [BindProperty]
        public string EmailValidationState { get; set; }


        [BindProperty]
        [DisplayName("Пароль для входа")]
        [DataType(DataType.Password)]
        [NotNullNotEmptyAttribute( "Не задан пароль для входа")]
        [MinLength(8, ErrorMessage = "Для пароля должна быть не менее 8 символов")]
        public string Password { get; set; }

        [BindProperty]
        public string PasswordValidationState { get; set; }

        
        [BindProperty]
        [DisplayName("Подтверждение")]
        [DataType(DataType.Password)]
        [NotNullNotEmptyAttribute( "Не задано подтверждение пароля")]
        public string Confirmation { get; set; }

        [BindProperty]
        public string ConfirmationValidationState { get; set; }


        [BindProperty]
        [DisplayName("Фамилия")]
        [NotNullNotEmptyAttribute( "Не указана фамилия пользователя")]
        [RegularExpression(@"^[а-яА-ЯёЁ]+$", ErrorMessage = "Фамилия может содержать только буквы русского алфавита")]
        public string SurName { get; set; }

        [BindProperty]
        public string SurNameValidationState { get; set; }


        [BindProperty]
        [DisplayName("Имя")]
        [NotNullNotEmptyAttribute( "Не указано имя пользователя")]
        [RegularExpression(@"^[а-яА-ЯёЁ]+$", ErrorMessage = "Имя может содержать только буквы русского алфавита")]
        public string FirstName { get; set; }

        [BindProperty]
        public string FirstNameValidationState { get; set; }


        [BindProperty]
        [DisplayName("Отчество")]
        [NotNullNotEmptyAttribute( "Не указано отчество пользователя")]
        [RegularExpression(@"^[а-яА-ЯёЁ]+$", ErrorMessage = "Отчество может содержать только буквы русского алфавита")]
        public string LastName { get; set; }

        [BindProperty]
        public string LastNameValidationState { get; set; }


        [BindProperty]
        [DisplayName("Дата рождения")]
        [DataType(DataType.Date)]
        [NotNullNotEmptyAttribute( "Не указана дата рождения пользователя")]
        public DateTime Birthday { get; set; }

        [BindProperty]
        public string BirthdayValidationState { get; set; }

        [BindProperty]
        [InputPhone("")]
        [DisplayName("Номер телефона")]
        [NotNullNotEmptyAttribute( "Не указана номер телефона")]
        public string Tel { get; set; }
        [BindProperty]
        public string TelValidationState { get; set; }

    }
}
