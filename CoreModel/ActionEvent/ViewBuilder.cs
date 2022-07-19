using NetCoreConstructorAngular.Data.DataAttributes.AttributeControls;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

 
/// <summary>
/// Реализует функцию связывания преждставления с источником данных и сквозными событиями приложения.
/// </summary>
public class ViewBuilder: ViewFactory
{
    [Label("Корневой тег компонента представления")]
    public string Tag { get; set; }

    [Label("Источник")]
    [Combobox("BusinessDatasource,Name")]
    public int DatasourceID { get; set; }

    
    [Label("Набор данных")]
    [Combobox("BusinessDataset,Name")]
    public int DatasetID { get; set; }



    //TODO: проверить работоспособность
    [OnChange("Datasource")]
    public void OnDatasourceChanged( PropertyChangedMessage message )
    {
        
    }


    /// <summary>
    /// Параметры однонаправленного внизходящегно связывания
    /// </summary>
    [JsonIgnore()]

    public Dictionary<string, string> InterpolationBindings = new Dictionary<string, string>();

    /// <summary>
    /// Параметры восходящего канала передачи событий
    /// </summary>
    [JsonIgnore()]

    public Dictionary<string, string> OutputBindings = new Dictionary<string, string>();


    /// <summary>
    /// Параметры связывания 
    /// </summary>
    [JsonIgnore()]
    public Dictionary<string, string> Bindings = new Dictionary<string, string>();


    public object Compile(Dictionary<string, string> bindings)
    {
        Bindings = bindings;
        return Compile();
    }
    public object Compile()
    {
        foreach (var p in Bindings)
        {
            string expression = p.Value;
            if (expression.IndexOf("{{") != -1)
            {
                string interpolated = Interpolate(expression);
                Setter.SetValue(this, p.Key, interpolated);
            }
            else
            {
                object value = GetBindedValue(expression, this);
                Setter.SetValue(this, p.Key, value);
            }



        }
        return this;
    }

    private object GetBindedValue(string value, object data)
    {
        if (ReflectionService.GetPropertyNames(data.GetType()).Contains(value))
        {
            return data.GetType().GetProperty(value).GetValue(data);
        }
        else
        {
            return Expression.Compile(value, data);
        }

    }
    


 
    object this[string path]
    {
        get 
        {
            return this;
        }
        set 
        { 

        }
    }


    public string Interpolate(string expression)
    {
        return Expression.Interpolate(expression, this);
    }
    public object Interpolate()
    {

        foreach (var p in InterpolationBindings)
        {

            object value = GetBindedValue(p.Value, this);
            Setter.SetValue(this, Naming.ToCapitalStyle(p.Key), value);

        }
        return this;
    }




    public void Bind(string propertyName, ViewItem target, string relativePropertyName)
    {
        var ctrl = this;
        target.OnEvent += (message) =>
        {
            if (message is PropertyChangedMessage)
            {
                PropertyChangedMessage changed = (PropertyChangedMessage)message;
                if (changed.Property == relativePropertyName)
                {
                    Setter.SetValue(ctrl, propertyName, changed.After);
                    ctrl.Changed = true;
                }
            }
        };
    }

}
 