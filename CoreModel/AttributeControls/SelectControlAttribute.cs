using NetCoreConstructorAngular.Data.DataAttributes;
using NetCoreConstructorAngular.Data.DataAttributes.AttributeControls;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

public class SelectControlAttribute: ControlAttribute
{
    private readonly string _expression;

    public Dictionary<object, object> _options { get; private set; }

    public SelectControlAttribute() {
         
    }
    public SelectControlAttribute(string expression)
    {
        _expression = expression;
    }


    

    public SelectControlAttribute(Dictionary<object, object> keyValuePairs)
    {
        _options = keyValuePairs;
        
    }


    public string GetMimeTypes()
    {
            //TODO:
        return "image/png";
    }

    

    public string GetViewComponents()
    {
        string s = "";
        /*foreach (string t in ComponentRegistry.VIEW_COMPONENTS)
        {
            if( t.IndexOf("ContextMenu")==-1 )
            s += $"{t},";
        }*/
        return s.Length == 0 ? "" : s.Substring(0, s.Length - 1);
    }


  

    public string GetInputTypes()
    {
        string s = "";
        
        foreach (string t in CoreTyping.INPUT_TYPES)
        {
            s += $"{t},";
        }
        
        return s.Length==0? "": s.Substring(0, s.Length - 1);
    }
    public string GetDataTypes()
    {
        string s = "";
        foreach(string t in CoreTyping.PRIMITIVE_TYPES)
        {
            s += $"{t},";
        }
        return s.Length == 0 ? "" : s.Substring(0, s.Length - 1);
    }


    /// <summary>
    /// Проверка ввода
    /// </summary>
    /// <param name="model"></param>
    /// <param name="property"></param>
    /// <param name="value"></param>
    /// <returns></returns>
    public virtual string Validate(object model, string property, object value)
    {
        if (this._options.Values.Contains(value.ToString()) == false)
        { 
            return GetMessage(model, property, value);
        }
        return null;
    }

    public override ViewItem CreateControl(FormField field )
    {
        _options = new Dictionary<object, object>();
        string interrpolationValue = Expression.Interpolate(_expression, this);
        foreach (string s in interrpolationValue.Split(","))
        {
            _options[s] = s;
        }
        return new Select() { 
            Options = _options
        };
    }

    public virtual string GetMessage(object model, string property, object value)
    {
        string sequence = "";
        foreach (string option in _options.Values)
        {
            sequence += option + ",";
        }
        sequence = sequence.Length == 0 ? "" : sequence.Substring(0, sequence.Length - 1);
        return $"Свойство {property} задаётся одним из значений: " + sequence + ". " +
                     "Значение " + value.ToString() + " не является таковым. ";
    }
}



/*
public class SelectControlSelfAttribute : ControlAttribute, MyValidation
{
    protected readonly Dictionary<object, object> _options;


    public SelectControlSelfAttribute() { }
    public SelectControlSelfAttribute(string expression)
    {
       
    }
     
    public string GetMimeTypes()
    {
        //TODO:
        return "image/png";
    }



    public string GetViewComponents()
    {
        string s = "";
        foreach (string t in ComponentRegistry.VIEW_COMPONENTS)
        {
            s += $"{t},";
        }
        return s.Substring(0, s.Length - 1);
    }




    public string GetInputTypes()
    {
        string s = "";
        foreach (string t in Typing.INPUT_TYPES)
        {
            s += $"{t},";
        }
        return s.Substring(0, s.Length - 1);
    }
    public string GetDataTypes()
    {
        string s = "";
        foreach (string t in Typing.PRIMITIVE_TYPES)
        {
            s += $"{t},";
        }
        return s.Substring(0, s.Length - 1);
    }

    public string GetHighchartViews()
    {
        string s = "";
        foreach(Type type in System.Reflection.Assembly.GetExecutingAssembly().GetTypes())
        {
            if (type.Name.StartsWith("Highchart") && type.BaseType!=null && type.BaseType.Name=="PaneItem")
            {
                s += type.Name + ",";
            }
        }
 
        return s.Substring(0, s.Length - 1);
    }


    /// <summary>
    /// Проверка ввода
    /// </summary>
    /// <param name="model"></param>
    /// <param name="property"></param>
    /// <param name="value"></param>
    /// <returns></returns>
    public string Validate(object model, string property, object value)
    {
        if (this._options.Values.Contains(value.ToString()) == false)
        {
            return GetMessage(model, property, value);
        }
        return null;
    }

    public override Control CreateControl(FormField field)
    {
        return new Select()
        {
            Options = _options
        };
    }

    public string GetMessage(object model, string property, object value)
    {
        string sequence = "";
        foreach (string option in _options.Values)
        {
            sequence += option + ",";
        }
        sequence = sequence.Substring(0, sequence.Length - 1);

        return $"Свойство {property} задаётся одним из значений: " + sequence + ". " +
                     "Значение " + value.ToString() + " не является таковым. ";
    }
}

*/