using Microsoft.EntityFrameworkCore.Metadata;
using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
public class Attrs
{

     

    /// <summary>
    /// Возвращает значение атрибута установленного для типа обьекта
    /// </summary>
    /// <param name="target"></param>
    /// <param name="attrName"></param>
    /// <returns></returns>
    public static string GetTypeAttrValue(object target, string attrName)
    {
        var attrs = ForType(target.GetType());
        if( attrs.ContainsKey(attrName)==false)
        {
            return null;
        }
        else
        {
            return attrs[attrName];
        }
    }

    /// <summary>
    /// Возвращаент имя свойства помеченного заданным атриюбутом
    /// </summary>
    /// <param name="target"></param>
    /// <param name="nameOfInputTypeAttribute"></param>
    /// <returns></returns>
    public static object GetValueMarkedByAttribute(object target, string nameOfInputTypeAttribute ){
        return Attrs.ForAllPropertiesInType(target.GetType()).Where(p=>p.Value.ContainsKey(nameOfInputTypeAttribute)).Select(p=>p.Key).Single();

    }
    public static List<string> GetSearchTerms(string entity)
    {
        Type entityType = ReflectionService.TypeForShortName(entity);
        List<string> terms = Attrs.SearchTermsForType(entityType);
        return terms;
    }

    /*
    public static bool HasInputImage(Type type)
    {
        string prop = GetInputImagePropertyName(type);
        if( prop == null)
        {
            foreach (var nav in GetNavigation(type))
            {
                if(Types.IsCollectionType(nav.GetType()) == false)
                {
                    prop = GetInputImagePropertyName(nav.GetType());
                    if (prop != null)
                    {
                        break;
                    }
                }
            }
        }
        return prop == null ? false : true;
    }*/

    public static string GetInputImageUrlExpression()
    {     
        return @"/api/Resource/Image?entity={{GetType().Name}}&id={{ID}}";
    }
    /*
    public static string GetInputImageUrl(object target)
    {
        string prop = GetInputImagePropertyName(target.GetType());
        if (prop != null)
        {
            string entity = target.GetType().Name;
            int id = int.Parse(ReflectionService.GetValueFor(target, "ID").ToString());
            return $"/api/Resource/Image?entity={entity}&id={id}";
        }
        else 
        {
            foreach (var nav in GetNavigation(target.GetType()))
            {
                if (Types.IsCollectionType(nav.GetType()) == false)
                {
                    prop = GetInputImagePropertyName(nav.GetType());
                    if (prop != null)
                    {
                        target = ReflectionService.GetValueFor(target, nav.Name);
                        if(target != null)
                        {
                            string entity = target.GetType().Name;
                            int id = int.Parse(ReflectionService.GetValueFor(target, "ID").ToString());
                            return $"/api/Resource/Image?entity={entity}&id={id}";
                        }
                        else
                        {
                            return $"/api/Resource/Image";
                        }
                        
                    }
                }
            }
        }
        throw new Exception("Не удалось найти изображение");

    }*/

    internal static string ForHelp(object target)
    {
        return GetTypeAttrValue(target, nameof(HelpMessageAttribute));
    }

    internal static string ForDescription(object target)
    {
        return GetTypeAttrValue(target, nameof(DescriptionAttribute));
    }
    /*
    internal static INavigation GetNavigationKeyFor(string instance, Type targetEntityType)
    {
        var navs = Attrs.GetNavigation(ReflectionService.TypeForName(instance));
        foreach(var nav in navs)
        {
            if(nav.TargetEntityType.Name == targetEntityType.FullName)
            {
                return nav;
            }
        }
        throw new Exception("Не найдено свойство навигации");
    }*/

    public static string GetInputImagePropertyName(Type type)
    {
        return GetInputImagePropertyName(ForAllPropertiesInType(type));
    }

    public static string GetInputImagePropertyName(Dictionary<string, Dictionary<string, string>> attrs)
    {
        foreach(var p in attrs)
        {
            if (attrs[p.Key].ContainsKey(nameof(InputImageAttribute)))
            {
                return p.Key;
            }
        }
        return null;
    }

    public static bool IsManyToManyRelation(Type type, string propertyName) {
        return Attrs.ForProperty(type, propertyName).ContainsKey(nameof(ManyToMany));
    }
    public static bool HasManyToManyRelation(Type type, string propertyName) {
        return Attrs.ForProperty(type, propertyName).ContainsKey(nameof(ManyToMany));
    }
    /*
    public static IEnumerable<INavigation> GetNavigation(Type type)
    {
        IEnumerable<INavigation> result = null;
        using (var _context = new ApplicationDbContext())
        {
            result = _context.GetNavigationPropertiesForType(type);
        }
        if(result == null)
        {
            return new List<INavigation>();
        }
        else
        {
            return result;
        }
    }*/

    internal static List<string> GetVisibleProperties(Type type)
    {
        List<string> props = new List<string>();
        foreach (string propertyName in ReflectionService.GetPropertyNames(type))
        {
            if( IsVisible(type,propertyName))
            {
                props.Add(propertyName);
            }
        }
        return props;
    }


    public static string[] GetCollectionTypePropertyNames(Type type, string propName)
    {
        return (from p in new List<PropertyInfo>(GetCollectionTypeProperties(type, propName)) select p.Name).ToArray();
    }
    public static PropertyInfo[] GetCollectionTypeProperties(Type type, string propName)
    {
        return ReflectionService.TypeForShortName(GetCollectionType(type, propName)).GetProperties();
    }
    public static Type GetCollectionSystemType(Type type, string propName)
    {
        return ReflectionService.TypeForShortName(GetCollectionType(type, propName));
    }

    public static bool IsCollectionType(Type type, string propName)
    {
        var property = type.GetProperty(propName);
        string TypeName = property.PropertyType.Name;          
        bool res = property.PropertyType.Name.StartsWith("List");
        if( res == false )
        {
            Type p = property.PropertyType;
            while (p != typeof(Object) && p != null)
            {
                if((from pinterface in new List<Type>(p.GetInterfaces()) where pinterface.Name.StartsWith("ICollection") select p).Count() > 0)
                {
                    return true;
                }
                p = p.BaseType;
            }
        }
        return res;
    }

    internal static bool IsInput(Type type, string name)
    {
        return IsInput(ForProperty(type, name));
    }
    internal static bool IsInput(Dictionary<string, string> attrs)
    {
        return attrs.ContainsKey(nameof(NotInputAttribute)) ? false : true;
    }

    public static string GetCollectionType(Type type, string propName)
    {
        var property = type.GetProperty(propName);
        string TypeName = property.PropertyType.Name;
        bool IsCollection = false;
        if (property.PropertyType.Name.StartsWith("List"))
        {
            IsCollection = true;
            string text = property.PropertyType.AssemblyQualifiedName;
            text = text.Substring(text.IndexOf("[[") + 2);
            text = text.Substring(0, text.IndexOf(","));
            TypeName = text.Substring(text.LastIndexOf(".") + 1);
            Writing.ToConsole(property.Name + " " + text);
        }
        return TypeName;
    }

    public static bool IsCollection(Type type, string propName)
    {        
        var property = type.GetProperty(propName);
        string TypeName = property.PropertyType.Name;
        bool IsCollection = false;
        if (property.PropertyType.Name.StartsWith("List"))
        {
            IsCollection = true;
            string text = property.PropertyType.AssemblyQualifiedName;
            text = text.Substring(text.IndexOf("[[") + 2);
            text = text.Substring(0, text.IndexOf(","));
            TypeName = text.Substring(text.LastIndexOf(".") + 1);
            Writing.ToConsole(property.Name + " " + text);
        }
        return IsCollection;
    }


    /// <summary>
    /// Подпись элемента визуализации ассоциированного со заданным свойством 
    /// </summary>
    /// <param name="model"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    public static string GetInputType(Type type, string name)
    {
        Dictionary<string, string> attrs = Attrs.ForProperty(type, name);
        return GetInputType(attrs);
    }




    /// <summary>
    /// Получение атрибута типа поля ввода
    /// </summary>
    /// <param name="attrs"></param>
    /// <returns></returns>
    public static string GetInputType(Dictionary<string, string> attrs)
    {
        string key = null;
        List<string> keys = new List<string>(attrs.Keys);
        InputTypeAttribute.GetInputTypes().ForEach((string name) =>
        {
            if (keys.Contains(name))
            {
                key = name;
            }
        });
        if( key != null )
        {
            return key.Replace("Attribute", "").Replace("Input", "");
        }
        else
        {
            return null;
        }
    }



    



    

    /// <summary>
    /// Получение атрибутов для обьекта
    /// </summary>
    /// <param name="p"></param>
    /// <returns></returns>
    public static Dictionary<string, string> ForObject(object p)
    {
   
        return ForType(p.GetType());
    }

    public static List<string> SearchTermsForType(Type p)
    {
        List<string> terms = new List<string>();
        Dictionary<string, string> attrs = ForType(p);
        if( attrs.ContainsKey(nameof(SearchTermsAttribute)))
        {
            terms.AddRange(attrs[nameof(SearchTermsAttribute)].Split(","));
        }
        return terms;
    }

    public static Dictionary<string, string> ForType(string p){        
        return ForType(ReflectionService.TypeForName(p));
    }
    public static Dictionary<string, string> ForType(Type p)
    {
        Dictionary<string, string> attrs = new Dictionary<string, string>();
        foreach (var data in p.GetCustomAttributesData())
        {
            string key = data.AttributeType.Name;
            foreach (var arg in data.ConstructorArguments)
            {
                string value = arg.Value.ToString();
                attrs[key] = value;
            }

        }
        return attrs;
    }

    internal static bool IsTrueValue(string v)
    {
        return v.ToLower() == "true";
    }

    public static string HelpFor(Type type, string property)
    {
        Dictionary<string, string> attrs = ForProperty(type, property);
        return attrs.ContainsKey(nameof(HelpMessageAttribute)) ? attrs[nameof(HelpMessageAttribute)] : "";

    }

    /// <summary>
    /// Подпись элемента визуализации ассоциированного со заданным свойством 
    /// </summary>
    /// <param name="model"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    public static string LabelFor(Type model, string name)
    {
        Dictionary<string, string> attrs = Attrs.ForProperty(model, name);
        if (attrs.ContainsKey(nameof(LabelAttribute)) == false)
        {
            return name;
            //throw new Exception($"Для создания надписи с именем поля ввода " +
            //    $"установите атрибут Label на свойство {name} в классе {model.GetType().Name}");
        }
        else
        {
            return attrs[nameof(LabelAttribute)];
        }
    }


    /// <summary>
    /// Получение значения атрибута для текста надписи
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    public static string LabelFor(Type type)
    {
        Dictionary<string, string> attrs = ForType(type);
        return attrs.ContainsKey(nameof(EntityLabelAttribute)) ? attrs[nameof(EntityLabelAttribute)] :
            attrs.ContainsKey(nameof(LabelAttribute)) ? attrs[nameof(LabelAttribute)] : null;
    }



    public static string DescriptionFor(Type type, string property)
    {
        Dictionary<string, string>  attrs = ForProperty(type, property);
        return attrs.ContainsKey(nameof(DetailsAttribute)) ? attrs[nameof(DetailsAttribute)] :
            attrs.ContainsKey(nameof(DescriptionAttribute)) ? attrs[nameof(DescriptionAttribute)] : null;
    }

    public static string LabelFor(object p)
    {
        Dictionary<string, string> attrs = ForObject(p);
        return attrs.ContainsKey(nameof(EntityLabelAttribute)) ? attrs[nameof(EntityLabelAttribute)] :
            attrs.ContainsKey(nameof(DisplayAttribute)) ? attrs[nameof(DisplayAttribute)] : p.GetType().Name;
    }

    public static string DescriptionFor(object p)
    {
        Dictionary<string, string> attrs = ForObject(p);
        return attrs.ContainsKey(nameof(DescriptionAttribute)) ? attrs[nameof(DescriptionAttribute)]: "";
    }

    public static string IconFor(Type type, string property)
    {
        Dictionary<string, string> attrs = ForProperty(type, property);
        return attrs.ContainsKey(nameof(IconAttribute)) ? attrs[nameof(IconAttribute)]: "person";

    }


    private static List<string> CONTROL_TYPES =
        GetControlTypeAttributes();

    private static List<string> GetControlTypeAttributes()
    {
        throw new NotImplementedException();
    }

    public static string GetControlType(Type type, string property)
    {
        var attrs = Attrs.ForProperty(type, property);
        return (from p in attrs.Keys where CONTROL_TYPES.Contains(p) select p).SingleOrDefault();
    }

    public static string IconFor(string type)
    {
        return IconFor(ReflectionService.TypeForName(type));
    }



    public static string IconFor(Type type)
    {
        Dictionary<string, string> attrs = ForType(type);
        return attrs.ContainsKey(nameof(IconAttribute)) ? attrs[nameof(IconAttribute)] : 
            attrs.ContainsKey(nameof(EntityIconAttribute)) ? attrs[nameof(EntityIconAttribute)] :
            null;
    }

    /// <summary>
    /// Проверка флага отображением
    /// </summary>
    /// <param name="type"></param>
    /// <param name="property"></param>
    /// <returns></returns>
    public static bool IsVisible(Type type,string property)
    {
        string hidden = ForPropertyValue(type, typeof(InputHiddenAttribute), property);
        return "True" == hidden ? false : true;
    }


    /// <summary>
    /// Получить значения атрибуf заданного для свойства
    /// </summary>
    /// <param name="type"></param>
    /// <param name="property"></param>
    /// <returns></returns>
    public static string ForPropertyValue(Type type, Type attr, String property)
    {
        if(type == null)
        {
            throw new Exception("Аргумент "+ type+" содержить ссылку на null");
        }
        Dictionary<string, string> attrs = new Dictionary<string, string>();
        if(type==null || type.GetProperty(property) == null)
        {
            throw new Exception("Свойство не найдено либо не задан тип");
        }
        foreach (var data in type.GetProperty(property).CustomAttributes )
        {
            string key = data.AttributeType.Name;
            if(key== attr.Name)
            {
                foreach (var arg in data.ConstructorArguments)
                {
                    string value = arg.Value.ToString();
                    return value;
                }
            }
            

        }
        return null;
    }


    /// <summary>
    /// Получить значения всех атрибутов заданных для свойства
    /// </summary>
    /// <param name="type"></param>
    /// <param name="property"></param>
    /// <returns></returns>
    public static Dictionary<string,string> ForProperty(Type type, String property)
    {
        if(type == null)
        {
            throw new ArgumentNullException();
        }


        Dictionary<string, string> attrs = null;
        PropertyInfo info = null;

        try
        {
            attrs = new Dictionary<string, string>();
            info = type.GetProperty(property);
        }
        catch(AmbiguousMatchException ex)
        {
            Writing.ToConsole(ex.Message);
        }
        
        if( info == null)
        {
            throw new Exception($"Свойство {property} не найдено в обьекте типа {type.Name}");
        }
        var datas = info.GetCustomAttributesData();
        if(datas != null )
            foreach (var data in datas)
            {
            
                string key = data.AttributeType.Name;
                //ParameterInfo[] pars = data.AttributeType.GetConstructors()[0].GetParameters();
                if(data.ConstructorArguments==null || data.ConstructorArguments.Count == 0)
                {
                    attrs[key] = "";
                }
                else
                {
                    foreach (var arg in data.ConstructorArguments)
                    {

                        string value = arg.Value==null? "":arg.Value.ToString();
                        attrs[key] = value;
                    }
                }
            
                //model.Attributes[data.AttributeType] = null;

            }

        if (attrs == null)
        {
            throw new Exception($"Не удалось получить атрибуты свойсва {property} класса {type.Name}");
        }
        return attrs;
    }

    public static Dictionary<string, string> ForMethod(Type controllerType, string name)
    {
        Dictionary<string, string> attrs = new Dictionary<string, string>();
        foreach (var method in controllerType.GetMethods())
        {            
            foreach (var data in method.GetCustomAttributesData())
            {
                string key = data.AttributeType.Name;
                foreach (var arg in data.ConstructorArguments)
                {
                    string value = arg.Value.ToString();
                    attrs[key] = value;
                }

            }
        }
        return attrs;
    }

    
    /// <summary>
    /// Извлечение метода HTTP из атрибутов
    /// </summary>
    /// <param name="attributes"></param>
    /// <returns></returns>
    public static string ParseHttpMethod(Dictionary<string, string> attributes)
    {
        foreach(var p in attributes)
        {
            switch(p.Key)
            {
                case "HttpPostAttribute":
                    return "GET";              
                case "HttpPutAttribute":
                    return "PUT";
                case "HttpPatchAttribute":
                    return "PATCH";
                case "HttpDeleteAttribute":
                    return "DELETE";
                default: return "GET";
            }
        }
        return "GET"; 
    }




    /// <summary>
    /// Выбор значения атрибута DataType
    /// </summary>
    /// <param name="attributes"></param>
    /// <returns></returns>
    public static string GetDataType(Dictionary<string, string> attributes)
    {
        foreach (var p in attributes)
        {
            switch (p.Key)
            {
                case "DataTypeAttribute":
                    switch (p.Value)
                    {
                        case "0":   return "custom";
                        case "1":   return "datetime";
                        case "2":   return "date";
                        case "3":   return "time";
                        case "4":   return "duration";
                        case "5":   return "phone";
                        case "6":   return "currency";
                        case "7":   return "text";
                        case "8":   return "html";
                        case "9":   return "textarea";
                        case "10":  return "email";
                        case "11":  return "password";
                        case "12":  return "url";
                        case "13":  return "image";
                        case "14":  return "creditCard";
                        case "15":  return "postalCode";
                        case "16":  return "upload";
                        default: throw new Exception("Неизвестный тип данных");
                    }

            }
        }
        return null;
    }

    internal static Dictionary<string, Dictionary<string, string>> ForAllPropertiesInType(Type type)
    {
        Dictionary<string, Dictionary<string, string>> result = new Dictionary<string, Dictionary<string, string>>();
        foreach(var prop in type.GetProperties())
        {
            Dictionary<string, string> forProperty = Attrs.ForProperty(type, prop.Name);
            result[prop.Name] = forProperty;
        }
        return result;
    }


    public static bool IsUniq(Dictionary<string, string> attributes)
    {
        return attributes.ContainsKey(nameof(UniqValidationAttribute));
    }

    internal static string GetUniqProperty(Dictionary<string, Dictionary<string, string>> attrs)
    {
        foreach(var p in attrs)
        {
            if( IsUniq(attrs[p.Key]))
            {
                return p.Key;
            }
        }
        return null;
    }

    internal static Attribute[] ForPropertyLikeAttrubtes(Type type, string property)
    {
        var attrs =  new List<Attribute>();
        if (type == null)
        {
            throw new ArgumentNullException();
        }


        
        PropertyInfo info = type.GetProperty(property);
        if (info == null)
        {
            throw new Exception($"Свойство {property} не найдено в обьекте типа {type.Name}");
        }
        foreach (var data in info.GetCustomAttributesData())
        {
            string key = data.AttributeType.Name;
            
            if (data.ConstructorArguments == null || data.ConstructorArguments.Count == 0)
            {
                Attribute attr = ReflectionService.Create<Attribute>(key,new object[0]);
                attrs.Add(attr);
            }
            else
            {
                List<object> parameters = new List<object>();
                foreach (CustomAttributeTypedArgument arg in data.ConstructorArguments)
                {
                    parameters.Add(arg.Value);
                }
                Attribute attr = ReflectionService.Create<Attribute>(key, parameters.ToArray());
                attrs.Add(attr);

            }

            //model.Attributes[data.AttributeType] = null;

        }
        return attrs.ToArray();
    }

    internal static string ForManyToMany(Type type, string bindingGroup)
    {
        return Attrs.ForProperty(type, bindingGroup)[nameof(ManyToMany)];
    }
}

