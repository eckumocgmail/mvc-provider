 
using Microsoft.EntityFrameworkCore;
using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;


/// <summary>
/// Проверка уникальности значения атрибута сущности
/// </summary>
public class UniqValidationAttribute : Attribute, MyValidation
{
    private readonly string _error;    

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="ErrorMessage">сообщение после отрицательной проверки</param>    
    public UniqValidationAttribute(string ErrorMessage){
        _error = ErrorMessage;        
    }

 
    private object GetDbSet(DbContext subject, string dbset)
    {
        Type type = subject.GetType();        
        foreach (MethodInfo info in type.GetMethods())
        {
            if (info.Name.StartsWith("get_"+ dbset) == true && info.ReturnType.Name.StartsWith("DbSet"))
            {
                return info.Invoke(subject, new object[0]);
            }
        }
        throw new Exception("Коллекция сущностей "+dbset +" не найдена");
    }

    public string Validate(object model, string property, object value)
    {
        foreach (Type t in GetDbContexts(Assembly.GetCallingAssembly()))
        {
          
            using (DbContext db = ((DbContext)ReflectionService.CreateWithDefaultConstructor<DbContext>(t)))
            {
                object dbsetObj = null;
                try
                {
                    dbsetObj = db.GetDbSet(model.GetType());
                }catch(Exception ex)
                {
                    continue;
                }
                int id = (int)new ReflectionService().GetValue(model, "ID");
                bool isUniq = true;
                foreach (var record in ((IEnumerable<dynamic>)dbsetObj))
                {
                    if (record.ID != id)
                    {
                        object recordPropertyValue = new ReflectionService().GetValue(record, property);
                        if (value == null)
                        {
                            if (recordPropertyValue == null)
                            {
                                isUniq = false;
                                break;
                            }
                        }
                        else
                        {
                            if (recordPropertyValue == null)
                            {
                                continue;
                            }
                            else
                            {
                                if (recordPropertyValue.ToString() == value.ToString())
                                {
                                    isUniq = false;
                                    break;
                                }
                            }
                        }
                    }
                }

                //bool result = (from i in ((IEnumerable<dynamic>)dbsetObj)
                //where new ReflectionService().GetValue(model, property) == value && i.ID != id
                //select i).Count() == 0;
                return isUniq ? null : GetMessage(model,property,value);
            }
        }
        return null;
        
    }

    private IEnumerable<Type> GetDbContexts(Assembly assembly)
    {
        throw new NotImplementedException();
    }

    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(_error))
        {
            return "Свойство "+property+" должно иметь уникальное значение";
        }
        else
        {
            return _error;
        }
    }


    /*
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {        
        using (ApplicationDbContext db = new ApplicationDbContext())
        {
            string dbsetPropertyName = null;
            if(_dbset == null)
            {
                string entityName = validationContext.ObjectType.Name;
                dbsetPropertyName = Counting.GetMultiCountName(validationContext.ObjectType.Name);
            }
            else
            {
                dbsetPropertyName = _dbset;
            }
            ReflectionService reflection = new ReflectionService();
            object dbsetObj = GetDbSet(db, dbsetPropertyName);
            string propertyName = validationContext.MemberName;            
            bool result = (from i in ((IEnumerable<dynamic>)dbsetObj)
                           where reflection.GetValue((object)i, propertyName) == value
                           select i).Count() == 0;
            return result? null: new ValidationResult(_error);
        }
            
    }*/



}
 
