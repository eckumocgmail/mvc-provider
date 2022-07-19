using ApplicationDb.Types;
 

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

/// <summary>
/// Реализует методы работы с типами
/// </summary>
public class Types
{
    
    internal static HashSet<string> PRIMITIVE_TYPES = new HashSet<string>() {
            "Byte[]", "System.Byte[]", "String", "Boolean", "System.String", "string", "int","long","float",
        "Nullable<System.Boolean>", "Double", "Nullable<System.Double>",
        "Int16", "Nullable<Int16>", "Int32", "Nullable<System.Int32>", 
        "Int64", "Nullable<System.Int64>", "UInt16", "UInt32", "UInt64",
        "DateTime", "Nullable<System.DateTime>" };
    internal static readonly IEnumerable<string> INPUT_TYPES = new HashSet<string>(ReflectionService.GetPublicStaticFieldNames(typeof(InputTypes)));
    
    internal static readonly IEnumerable<string> NUBMER_TYPES = new HashSet<string>() {
              "System.Decimal",  "Decimal", "Nullable<System.Decimal>", "System.Float", 
        "Float", "Nullable<System.Float>", "System.Double",  "Double", "Nullable<System.Double>",
        "Int16", "System.Int16", "Nullable<System.Int16>",
        "Int32", "System.Int32", "Nullable<System.Int32>",
        "Int64", "System.Int64", "Nullable<System.Int64>",
        "UInt16", "System.UInt16", "Nullable<System.UInt16>",
        "UInt32", "System.UInt32", "Nullable<System.UInt32>",
        "UInt64", "System.UInt64", "Nullable<System.UInt64>"  };
    internal static readonly IEnumerable<string> TEXT_TYPES = new HashSet<string>() {
            "String,System.String" };
    internal static readonly IEnumerable<string> LOGICAL_TYPES = new HashSet<string>() {
            "Boolean","System.Boolean","Nullable<System.Boolean>", };
    public static bool IsExtendedFrom(Type targetType, string baseType)
    {
        Type typeOfObject = new object().GetType();
        Type p = targetType;
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


    public static bool IsActiveObject(Type type)
    {
        return IsExtendedFrom(type, nameof(ActiveObject));
    }
     

    public static bool IsHierDictinary(Type entityType )
    {
        bool isHier = false;
        Type p = entityType;
        while (p != typeof(Object) && p != null)
        {
            if (p.Name.StartsWith("HierDictionaryTable"))
            {
                isHier = true;
                break;
            }
            p = p.BaseType;
        }

        return isHier;
    }
    public static string ParseCollectionType(Type type)
    {
        string text = type.AssemblyQualifiedName;
        text = text.Substring(text.IndexOf("[[") + 2);
        text = text.Substring(0, text.IndexOf(","));
        return text.Substring(text.LastIndexOf(".") + 1);
    } 

    public static bool HasBaseType( Type targetType, Type baseType )
    {
        if (targetType == null)
            throw new Exception("Тип не определён");
        Type p = targetType.BaseType;
        while (p != typeof(Object) && p != null)
        {
            if (p.Name == baseType.Name)
            {
                return true;                
            }
            p = p.BaseType;
        }
        return false;
    }



    internal static bool IsDateTime( PropertyInfo property )
    {
        string propertyType = ParsePropertyType(property.PropertyType);
        if(propertyType == "System.DateTime" || propertyType == "DateTime" || propertyType == "Nullable<DateTime>" || propertyType == "Nullable<System.DateTime>")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    internal static bool IsNullable(PropertyInfo property)
    {
        string propertyType = ParsePropertyType(property.PropertyType);
        return propertyType.StartsWith("Nullable");
    }

     
    public static bool IsCollectionType(Type type)
    {
        Type p = type;
        while (p != typeof(Object) && p != null)
        {
            if ((from pinterface in new List<Type>(p.GetInterfaces()) where pinterface.Name.StartsWith("ICollection") select p).Count() > 0)
            {
                return true;
            }
            p = p.BaseType;
        }
        return false;
    } 
    internal static string ParsePropertyType(Type propertyType)
    {
        string name = propertyType.Name;
        if( name.Contains("`"))
        {
            string text = propertyType.AssemblyQualifiedName;
            text = text.Substring(text.IndexOf("[[") + 2);
            text = text.Substring(0, text.IndexOf(","));
            name = name.Substring(0, name.IndexOf("`"))+"<"+text+">";

        }
        return name;
    }



    /// <summary>
    /// Метод получения описателя вызова статических методов 
    /// </summary>
    /// <param name="type"> тип </param>
    /// <returns> описание статических методов </returns>
    public static Dictionary<string, object> GetStaticMethods(Type type)
    {
        Dictionary<string, object> actionMetadata = new Dictionary<string, object>();
        foreach (MethodInfo info in type.GetMethods())
        {
            if (info.IsPublic && info.IsStatic)
            {
                Dictionary<string, object> args = new Dictionary<string, object>();
                foreach (ParameterInfo pinfo in info.GetParameters())
                {
                    args[pinfo.Name] = new
                    {
                        type = pinfo.ParameterType.Name,
                        optional = pinfo.IsOptional,
                        name = pinfo.Name
                    };
                }
            }
        }
        return actionMetadata;
    }
    public List<string> GetEventListeners()
    {
        List<string> listeners = new List<string>();
        foreach (EventInfo evt in GetType().GetEvents())
        {
            listeners.Add(evt.Name.ToLower());
        }
        return listeners;
    }
    internal static bool IsNumber(PropertyInfo propertyInfo)
    {
        return NUBMER_TYPES.Contains(ParsePropertyType(propertyInfo.PropertyType));
    }

    internal static bool IsText(PropertyInfo propertyInfo)
    {
        return TEXT_TYPES.Contains(ParsePropertyType(propertyInfo.PropertyType));
    }

    public static bool IsPrimitive(string propertyType)
    {
        Type type = ReflectionService.TypeForName(propertyType);
        
        return PRIMITIVE_TYPES.Contains(ParsePropertyType(type));
    }

    public static bool IsPrimitive(Type propertyType)
    {
        return PRIMITIVE_TYPES.Contains(ParsePropertyType(propertyType));
    }

    public static bool IsPrimitive(Type modelType, string property)
    {
        return PRIMITIVE_TYPES.Contains(ParsePropertyType(modelType.GetProperty(property).PropertyType));
    }

    internal static bool IsBoolean(PropertyInfo propertyInfo)
    {
        return LOGICAL_TYPES.Contains(ParsePropertyType(propertyInfo.PropertyType));
    }

    internal static bool ReferenceIsDictionary(object properties)
    {
        return properties.GetType().Name.Contains("Dictionary");
    }
}
