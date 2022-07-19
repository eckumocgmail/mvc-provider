using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

public class MyValidatableObject: IValidatableObject 
{
    /// <summary>
    /// true, если тип обьекта наследуется от заданного
    /// </summary>
    /// <param name="baseType"></param>
    /// <returns></returns>
    public bool IsExtendedFrom(string baseType)
    {
        Type typeOfObject = new object().GetType();
        Type p = GetType();
        while (p != typeOfObject)
        {
            if (p.Name == baseType)
            {
                return true;
            }
            p = p.BaseType;
        }
        return false;
    }


    public Dictionary<string, List<string>> Validate(string[] keys)
    {
        Dictionary<string, List<string>> results = new Dictionary<string, List<string>>();
        foreach(string key in keys)
        {
            List<string> errors = Validate(key);
            if (errors.Count() > 0)
            {
                results[key] = errors;
            }
        }

        return results;
    }

    public List<string> Validate(string key)
    {
        
        List<string> errors = new List<string>();
        var attributes = Attrs.ForProperty(this.GetType(), key);

        foreach (var data in this.GetType().GetProperty(key).GetCustomAttributesData())
        {
            if (data.AttributeType.GetInterfaces().Contains(typeof(MyValidation)))
            {
                List<object?> args = new List<object?>();
                foreach (var a in data.ConstructorArguments)
                {
                    args.Add(a.Value);
                }
                MyValidation validation =
                    ReflectionService.Create<MyValidation>(data.AttributeType, args.ToArray());
                object value = new ReflectionService().GetValue(this, key);
                string validationResult =
                    validation.Validate(this, key, value);
                if (validationResult != null)
                {

                    errors.Add(validationResult);
                }
            }
        }
        return errors;
    }

  
    
    /// <summary>
    /// Проверка данных порождает исключение при не соответвии требованиям
    /// </summary>
    public void EnsureIsValide()
    {
        var r = Validate();
        if(r.Count() > 0)
        {
            throw new ValidationException($"Обьект "+GetType().Name + " не валидный");
        }
    }
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        List<ValidationResult> results = new List<ValidationResult>();
        Dictionary<string, List<string>> errors = Validate();
        foreach(var errorEntry in errors)
        {
            string propertyName = errorEntry.Key;
            List<string> propertyErrors = errorEntry.Value;
            foreach(string propertyError in propertyErrors)
            {
                ValidationResult result = new ValidationResult(propertyError, new List<string>() { propertyName });               
                results.Add(result);
            }
        }        
        return results;
    }

    public object GetValue(string key)
    {
        return ReflectionService.GetValueFor(this,key);
    }

    public void SetValue(string key, object value)
    {
        PropertyInfo prop = this.GetType().GetProperty(key);
        if (prop != null)
        {
            prop.SetValue(this, value);
        }
        FieldInfo field = this.GetType().GetField(key);
        if (field != null)
        {
            field.SetValue(this, value);
        }
    }
    /// <summary>
    /// Валидация модели по правилам определённым через атрибуты
    /// </summary>
    /// <returns></returns>
    public virtual Dictionary<string, List<string>> Validate(  )
    {
        object target = this;
        Dictionary<string, List<string>> result = new Dictionary<string, List<string>>();
        foreach (var property in target.GetType().GetProperties())
        {
            string key = property.Name;

            if (CoreTyping.IsPrimitive(property.PropertyType))
            {
                List<string> errors = Validate(key);
                if (errors.Count > 0)
                {
                    result[key] = errors;
                }

            }
        }
        var optional = ValidateOptional();
        foreach (var p in optional)
        {
            if (result.ContainsKey(p.Key))
            {
                result[p.Key].AddRange(optional[p.Key]);
            }
            else
            {
                result[p.Key] = optional[p.Key];
            }
        }


        return result;
    }


    public virtual Dictionary<string, List<string>> ValidateOptional()
    {
        return new Dictionary<string, List<string>>();
    }

}