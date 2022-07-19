using CoreModel;
 
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

 
     
public class NamedObject: BaseEntity 
{             
    //[Label("Наименование")]
    //[NotNullNotEmpty("Необходимо указать наименование")]
    //[UniqValidation("Имя должно иметь уникальное значение")]
    //[RusText("Используйте русский имена")]
    public string Name { get; set; }
    public string Description { get; set; }

    



    [NotMapped]
    //[InputHidden(true)]
    public object Item { get; set; }

    [NotMapped]
    //[InputHidden(true)]
    public object Value
    {
        get
        {
            return Item;
        }
        set
        {
            Item = value;
        }
    }
}
 