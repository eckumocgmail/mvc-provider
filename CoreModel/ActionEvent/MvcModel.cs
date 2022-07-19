


using System;
using System.Collections.Generic;
using System.Reflection;

public class MvcModel
{



    /// <summary>
    /// Получение списка имён свойств определённых в обьекте
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public string GetLabel()
    {
        
        object target = this;
        return Attrs.LabelFor(target);
    }



    

    /// <summary>
    /// Текст надписи, ан-но <label asp-for=""></label>
    /// </summary>
    /// <param name="Name"></param>
    /// <returns></returns>
    public string LabelFor(string Name)
    {
        Dictionary<string, string> attrs = Attrs.ForProperty(this.GetType(), Name);
        if (attrs.ContainsKey(nameof(LabelAttribute)) == false)
        {
            throw new Exception($"Для создания надписи с именем поля ввода " +
                $"установите атрибут Label на свойство {Name} в классе {GetType().Name}");
        }
        else
        {
            return attrs[nameof(LabelAttribute)];
        }
    }





    /// <summary>
    /// Получение описания определённого через атрибуты
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public string GetDescription( )
    {
        object target = this;
        return Attrs.DescriptionFor(target);
    }


    /// <summary>
    /// Получение списка имён свойств определённых в обьекте
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public List<string> GetPropertyNames()
    {
        object target = this;
        List<string> names = new List<string>();
        foreach (PropertyInfo propertyInfo in target.GetType().GetProperties())
        {
            names.Add(propertyInfo.Name);
        }
        return names;
    }


    /// <summary>
    /// Получение списка имён свойств определённых в обьекте
    /// </summary>
    /// <param name="target"></param>
    /// <returns></returns>
    public List<string> GetFieldNames()
    {
        object target = this;
        List<string> names = new List<string>();
        foreach (var propertyInfo in target.GetType().GetFields())
        {
            names.Add(propertyInfo.Name);
        }
        return names;
    }


    public object GetValue(string name)
    {    
        PropertyInfo propertyInfo = this.GetType().GetProperty(name);
        FieldInfo fieldInfo = this.GetType().GetField(name);
        return
            fieldInfo != null ? fieldInfo.GetValue(this) :
            propertyInfo != null ? propertyInfo.GetValue(this) :
            null;

    }
    public string ToText()
    {
        string text = "";
        ReflectionService.GetOwnPropertyNames(this.GetType()).ForEach(p => { text += ReflectionService.GetValueFor(this,p)+" ";   });
        return "ID";
    }
}

