using CoreModel;

 
using System.Collections.Generic;

[EntityIcon("message")]
[EntityLabel("Информационные характеристики сообщений")]
public class MessageProtocol : BusinessEntity<MessageProtocol>
{         
    

    [Label("Источник")]     
    [SelectDictionary(nameof(BusinessFunction) + ",Name")]
    public int? FromID { get; set; }
    public virtual BusinessFunction From { get; set; }


    public int? FromBusinessFunctionID { get; set; }
    public int? ToBusinessFunctionID { get; set; }

    [Label("Приёмник")]
    [SelectDictionary(nameof(BusinessFunction) + ",Name")]
    public int? ToID { get; set; }
    public virtual BusinessFunction To { get; set; }


    [Label("Свойства")]
    public virtual List<MessageProperty> Properties { get; set; }


    public MessageProtocol()
    {
    }

    public BusinessFunction GetFromBusinessFunction()
    {
        using (var db = new ApplicationDbContext())
        {
            return db.BusinessFunctions.Find(FromBusinessFunctionID);
        }
    }


    public BusinessFunction GetToBusinessFunction()
    {
        using (var db = new ApplicationDbContext())
        {
            return db.BusinessFunctions.Find(ToBusinessFunctionID);
        }
    }


    public string GetInputTableName()
    {
        return "";// "[" + RusEngTranslite.TransliteToLatine(this.Name).ToUpper() + "]";
    }

    
}
