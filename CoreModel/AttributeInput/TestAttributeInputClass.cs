using CoreModel;

using NetCoreConstructorAngular.Data.DataAttributes.AttributeInput;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

 


[Label("Тестирование ввода")]
[Details("Класс для тестирования атрибутов устанавливающих тип ввода")]
public class TestAttributeInputClass: BaseEntity
{

    public TestAttributeInputClass() : base()
    {      
    }

    [Label("Электронная почта")]
    [Icon("email")]
    [Details("Необходимо для авторизации")]
    [HelpMessage("Регистрируйте учетную запись только свой личный почтовый ящик")]
    [InputEmail("Значение не является адресом электронной почты")]
    public string Email { get; set; } = "eckumoc@gmail.com";

    [Label("Пароль")]
    [Icon("person")]
    [InputPassword()]
    [NotNullNotEmpty("Необходимо указать пароль")]
    [TextLength(8,12,"Пароль должен состоять из 8-12 символов")]
    public string Password { get; set; } = "";


    [Label("Номер телефона")]
    [Icon("phone")]
    [InputPhone("Значение не является номером телефона")]
    public string Phone { get; set; } = "7-904-334-1124";

    [Label("Домашняя страница")]
    [Icon("home")]
    [InputUrl("Значение не является общедоступным URL ресурсом")]
    public string Url { get; set; } = "https://www.google.com";

    [Icon("home")]
    [Label("Краткое описание")]
    [InputMultilineText()]
    public string Description { get; set; } = "This is a test.";

    [Label("День")]
    [Icon("home")]
    [InputDate()]
    public DateTime Date { get; set; } = DateTime.Now;

    [Label("Месяц")]
    [Icon("home")]
    [InputMonth()]
    public DateTime Month { get; set; } = DateTime.Now;

    [InputYear()]
    [Label("Год")]
    [Icon("home")]
    public DateTime Year { get; set; } = DateTime.Now;


    [Label("Цвет")]
    [Icon("home")]
    [InputColor("Цвет задан неверно")]
    public string Color { get; set; } = "FFFFFF";


   // [InputFile("")]
   // public byte[] File { get; set; } = new byte[0];
}
