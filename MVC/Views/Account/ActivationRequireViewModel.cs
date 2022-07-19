using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


public class ActivationRequireViewModel
{   
    [DisplayName("Код активации")] 
    [NotNullNotEmptyAttribute( "Не указан код активации")]
    public string ActivationKey { get; set; }

    public string Email { get; set; }
    public string Message { get; set; }


}
