using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationMVC.Views.Account
{
    public class RestoreModel
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
 
    }
}
