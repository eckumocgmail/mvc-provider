using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

 
public class ComboboxAttribute : ControlAttribute
{
    private readonly string entity;
    private readonly string property;

    public ComboboxAttribute(string pair) 
    {
        /*if( string.IsNullOrEmpty(pair) || pair.IndexOf(",") == -1)
        {
            pair = "{{GetType().Name}},ID";
        }*/
        string[] spices = pair.Split(",");
        if( spices.Length != 2)
        {
            throw new ArgumentException("Атрибут SelectDataDictionary задан не правильно");
        }
        this.entity = spices[0].Trim();
        this.property = spices[1].Trim();
        if (this.property.StartsWith("{{") == false)
        {
            this.property = "{{" + this.property + "}}";
        }
    }


      

    public override ViewItem CreateControl( FormField field )
    {
            
        Dictionary<object, object> options = new Dictionary<object, object>();
        /*using (var db = new ApplicationDbContext())
        {
                
            object[] records = new CRUDS(db).List(entity);
            foreach (var record in records)
            {
                options[ReflectionService.GetValueFor(record, "ID")] = Expression.Interpolate(property,record);
            }
        }
        var combobox = new Combobox() { 
            TypeName = entity,
            Options = options            
        };
        combobox.AddOptionFor = (record) =>
        {
            options[ReflectionService.GetValueFor(record, "ID")] = Expression.Interpolate(property, record);
            combobox.Value = ReflectionService.GetValueFor(record, "ID");
            combobox.Changed = true;
        };
        return combobox;*/
        return null;
    }
}
 