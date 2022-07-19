using ActionEvent;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;


public class ViewItem : StyledItem, ClientAPI
{

    
    public int hashcode { get; set; }

    [JsonIgnore]
    public Func<object, ViewContext> GetSession { get; set; }

    [NotInput("")]
    [JsonIgnore]
    public ContextMenu ContextMenu { get; set; }

    
    [NotInput("Устанавливается значение True после вывода контента компонента представления")]
    public bool ViewInitiallized = false;


    [NotInput("Устанавливается значение True после регистрации в сеансе. см. частичное представление Container")]
    public bool HasRegistered { get; set; }

    
    //[AssemblyDescription(Na)]
    [Description("Форматы представления")]
    [HelpMessage("Форматы представления представляют из себя классы CSS стилей")]
    [InputStructureCollection("string")]
    public List<string> ClassList { get; set; } = new List<string>();



    [JsonIgnore]

    public SelectionModel SelectionModel = new SelectionModel();

    [JsonIgnore]
    private Dictionary<string, Action> Procedures = new Dictionary<string, Action>();




    [JsonIgnore]
    public Action<ViewItem> OnUpdate { get; set; }


    public virtual ViewItem IsNotForUpdate()
    {
        
        Changed = false;
        return this;
    }


    [JsonIgnore]
    [NotInput("")]
    public string ClassAttr
    {
        get
        {
            
            string r = "";
            foreach (string s in ClassList)
            {
                r += s + " ";
            }
            return r;
        }
        set
        {

        }
    }



    /**
     * выполняется по событиям элементов контекстного меню
     */
    public void OnContextMenu(int hashcode)
    {
      
        ContextMenu menuitem = (from p in ContextMenu.Items where p.GetHashCode() == hashcode select p).SingleOrDefault();
        if( menuitem != null)
            menuitem.OnClick(menuitem);
    }

    
    




    public ContextMenu GetContextMenu()
    {                
        return ContextMenu;
    }




    /**
     * Регистрация обработчиков событий изменения свойств
     */
    public void AddPropertyChangeListener(string property, Action<PropertyChangedMessage> listener)
    {
        OnEvent += (message) => { 
            if( message is PropertyChangedMessage)
            {
                PropertyChangedMessage changed = (PropertyChangedMessage)message;
                if (changed.Property == property)
                {
                    listener(changed);
                }
            }
        };
    }



    /**
     * Возвращает результат выполнения запроса к базовому источнику данных
     */
    //public abstract object Sql(string sql);
   /* {
       
        using (var db = new ApplicationDbContext())
        {
            return db.GetDatabaseManager().CleverExecute(sql).ResultSet;
        }
        
    }*/




    public override void Init()
    {        
        
        base.Init();
        var ctrl = this;        
        if (this.ContextMenu == null)
        {
            this.ContextMenu = new ContextMenu();
            this.ContextMenu.Items.Add(new ContextMenu() {
                Label = "Справка",
                OnClick = (b) => {
                    ShowHelp(ctrl.GetHelp());
                }
            });
            this.ContextMenu.Items.Add(new ContextMenu() {
                Label = "Свойства",
                OnClick = (b) => {
                    InputDialog("Test", "Person");
                }
            });
        }
        Interpolate();
    }

    [JsonIgnore()]
    public object DataSet { get; set; }

    [JsonIgnore()]
    public ClientAPI Client { get; set; }

 




    [JsonIgnore()]
    public Action<object> OnEvent;

    public void AddPropertyChangeListener(string propertyName )
    {

    }


    public override void SendEvent(object messageEvent)
    {
        BeforeSendEvent(messageEvent);
        if( Parent != null)
        {
            Parent.SendEvent(messageEvent);
        }
    }


    public override void BeforeSendEvent(object messageEvent)
    {       
        if( messageEvent is PropertyChangedMessage)
        {
            ((PropertyChangedMessage)messageEvent).GetBindedActionName();
        }
        if(OnEvent!=null)
        {
            OnEvent(messageEvent);
        }   
    }
 







    

    public string ToJson()
    {
        return JObject.FromObject(this).ToString();
    }


    public string CreateProcedure(string name, Action todo) {
        Procedures[name] = todo;
        return name;
    }


    public List<string> GetChanges()
    {
        List<string> changes = new List<string>();
        if (this.WasChanged())
        {
            changes.Add("" + GetContentPath());
        }
        foreach (var pchild in Children)
        {
            if (pchild is ViewItem)
            {
                ViewItem childItem = ((ViewItem)pchild);
                changes.AddRange(childItem.GetChanges());
            }
            
        }
        return changes;
    }


    public HashSet<int> GetChangedModels()
    {
        HashSet<int> changes = new HashSet<int>();
        if (this.ViewInitiallized)
        {
            if (this.WasChanged())
            {
                changes.Add(GetContentPath());
            }
            foreach (var pchild in Children)
            {
                if(pchild is ViewItem)
                {
                    ViewItem childItem = ((ViewItem)pchild);
                    var changedModels = childItem.GetChangedModels();
                    foreach (int code in changedModels)
                    {
                        changes.Add(code);
                    }
                     
                }
            }
        }
        return changes;
    }


    public ViewItem Find(int hashcode)
    {
        ViewItem result = null;
        Do((p) => {
            if( p is ViewItem)
            {
                if (((ViewItem)p).GetContentPath() == hashcode)
                {
                    result = ((ViewItem)p);
                }
            }
            
        });
        return result;
    }


    public ViewItem():base()
    {
        SetupDefaults();
        
        OnEvent += (message) =>
        {
            if (message is PropertyChangedMessage)
            {
                PropertyChangedMessage propertyChangedMessage = (PropertyChangedMessage)message;
                if (propertyChangedMessage.Property == "Selectable")
                {
                    ViewItem viewSource = ((ViewItem)propertyChangedMessage.Source);
                    if(viewSource == this)
                    {
                        Changed = true;
                    }
                    
                }
                else if (propertyChangedMessage.Property == "Selected")
                {
                    if(propertyChangedMessage.Source is ViewItem)
                    {
                        ViewItem viewSource = ((ViewItem)propertyChangedMessage.Source);
                        if (((bool)propertyChangedMessage.After))
                        {
                            SelectionModel.Add(viewSource);
                        }
                        else
                        {
                            SelectionModel.Remove(viewSource);
                        }
                    }
                    
                }
            }
        };
        //Changed = false;


    
        /*OnInitPort += (item) =>
        {
            Emit(item);
        };*/
        /*this.Children.OnChange += (sender, args) =>
        {
            Writing.ToConsole("Children changed");
        };*/
    }





    /// <summary>
    /// Установка значений по-умолчанию
    /// </summary>
    private void SetupDefaults()
    {
        var ctrl = this;
        OnEvent = (message) => {
             //TODO
             //TODO
         };
        this.hashcode = this.GetContentPath();
         var viewItem = this;
         ContextMenu = new ContextMenu()
         {
             Items = new List<ContextMenu>() {
                new ContextMenu()
                {
                    Label = "Свойства",
                    OnClick = (p)=>{
                        Top = new Button();
                        ctrl.Changed = true;
                    }
                }
            }
         };
        this.HasRegistered = false;
        this.Parent = null;
        
        this.Focused = false;
        this.Changed = false;
    }





    public virtual void OnTimeUpdate()
    {
        
    }


    


    


    



    /*public void OnClick( JObject message )
    {
        if(message.ContainsKey("action") == false)
        {
            throw new Exception("Отсутствует параметер eventArgs.action");
        }
        else
        {
            string action = message["action"].ToString();
            InvokeHelper.Do(this,action);
        }        
    }*/


    /*public int GetLevel()
    {
        int level = 0;
        var p = this;
        while (p != null && (p is Tree))
        {
            level++;
            p = p.Parent;
        }
        return level;
    }*/


    [JsonIgnore()]
    public string ContentPathExpression = "{{GetHashCode()}}";
    public int GetContentPath()
    {
        return GetHashCode();
    }


    


    public object Map(string propertyName,JArray dataset, Dictionary<string,string> binndings)
    {
        string itemTypeName = CoreTyping.ParseCollectionType(GetType().GetProperty(propertyName).PropertyType);
        Type itemType = ReflectionService.TypeForName(itemTypeName);
        var list = new List<object>();
        foreach(var jvalue in dataset)
        {
            object newInstance = ReflectionService.Create<object>(itemType, new object[0]);
            foreach (var p in binndings)
            {
                object value = Expression.Compile(p.Value, jvalue);
                Setter.SetValue(newInstance, p.Key, value);                                 
            }
        }
        return list;
    }


    public string Trace()
    {
        return Formating.ToXML(this);
    }






    public bool InfoDialog(string Title, string Text, string Button)
    {
        return this.Client.InfoDialog(Title,Text,Button);
    }

    public void ShowHelp(string Text)
    {
        this.Client.ShowHelp(Text);
    }

    public bool RemoteDialog(string Title, string Url)
    {
        return this.Client.RemoteDialog(Title,Url);
    }

    public bool ConfirmDialog(string Title, string Text)
    {
        return this.Client.ConfirmDialog(Title, Text);
    }

    public bool CreateEntityDialog(string Title, string Entity)
    {
        return this.Client.ConfirmDialog(Title, Entity);
    }

    public object InputDialog(string Title, object Properties)
    {
        return this.Client.InputDialog(Title, Properties);
    }

    public string Eval(string js)
    {
        return this.Client.Eval(js);
    }

    public string HandleEvalResult(Func<object, object> handle, string js)
    {
        return this.Client.HandleEvalResult(handle,js);
    }

    public string Callback(string action, params string[] args)
    {
        return this.Client.Callback(action,args);
    }

    public bool AddEventListener(string id, string type, string js)
    {
        return this.Client.AddEventListener(id, type, js);
    }

    public bool DispatchEvent(string id, string type, object message)
    {
        return this.Client.DispatchEvent(id, type, message);
    }

    public string OnConnected(string token)
    {
        return this.Client.OnConnected(token);
    }
}