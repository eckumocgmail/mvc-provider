 
using System;
/// <summary>
/// Выполняет установку значений свойств
/// </summary>
public class Setter
{

    public static void SetValue( object target, string property, object value )
    {
        var p = target.GetType().GetProperty(property);
        if (Types.IsDateTime(p))
        {
            DateTime? date = TextConverter.parseDate(value.ToString());
            p.SetValue(target, date);
        }
        else if (Types.IsNumber(p))
        {
            if( value == null || string.IsNullOrEmpty(value.ToString()))
            {
                if(Types.IsNullable(p) && Types.IsPrimitive(p.PropertyType)==false)
                {
                    p.SetValue(target, null);
                }
                else
                {
                    throw new Exception($"Свойство {property} не может хранить ссылку на null");
                }
            }
            else
            {
                string propertyType = Types.ParsePropertyType(p.PropertyType);
                switch (propertyType)
                {
                    case "Single": { p.SetValue(target, System.Single.Parse(value.ToString())); break; }
                    case "System.Single": { p.SetValue(target, System.Single.Parse(value.ToString())); break; }
                    case "Double": { p.SetValue(target, System.Double.Parse(value.ToString())); break; }
                    case "System.Double": { p.SetValue(target, System.Double.Parse(value.ToString())); break; }
                    case "Decimal": { p.SetValue(target, System.Decimal.Parse(value.ToString())); break; }
                    case "System.Decimal": { p.SetValue(target, System.Decimal.Parse(value.ToString())); break; }
                    case "Int16": { p.SetValue(target, System.Int16.Parse(value.ToString())); break; }
                    case "System.Int16": { p.SetValue(target, System.Int16.Parse(value.ToString())); break; }
                    case "Int32": { p.SetValue(target, System.Int32.Parse(value.ToString())); break; }
                    case "System.Int32": { p.SetValue(target, System.Int32.Parse(value.ToString())); break; }
                    case "Nullable<Int32>": { p.SetValue(target, System.Int32.Parse(value.ToString())); break; }
                    case "Nullable<System.Int32>": { p.SetValue(target, System.Int32.Parse(value.ToString())); break; }
                    case "Int64": { p.SetValue(target, System.Int64.Parse(value.ToString())); break; }
                    case "System.Int64": { p.SetValue(target, System.Int64.Parse(value.ToString())); break; }
                    case "UInt16": { p.SetValue(target, System.UInt16.Parse(value.ToString())); break; }
                    case "System.UInt16": { p.SetValue(target, System.UInt16.Parse(value.ToString())); break; }
                    case "UInt32": { p.SetValue(target, System.UInt32.Parse(value.ToString())); break; }
                    case "System.UInt32": { p.SetValue(target, System.UInt32.Parse(value.ToString())); break; }
                    case "UInt64": { p.SetValue(target, System.UInt64.Parse(value.ToString())); break; }
                    case "System.UInt64": { p.SetValue(target, System.UInt64.Parse(value.ToString())); break; }
                    default:
                        throw new Exception($"Тип свойства {property} {propertyType} неподдрживается");
                }


            }
            /*if (value != null && (value.GetType().Name == "Int64" || propertyTypeName == "Int32"))
            {
                value = Int32.Parse(value.ToString());
            }*/
        }
        else if (Types.IsText(p)) 
        {
            p.SetValue(target, value.ToString());
        }
        else
        {
            p.SetValue(target, value);
        }

    }
}