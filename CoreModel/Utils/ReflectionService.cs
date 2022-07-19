 

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
 
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging; 
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Buffers;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
 
public class ReflectionService : ILogger<ReflectionService> {
    private static HashSet<string> PrimitiveTypeNames = Types.PRIMITIVE_TYPES;
    private static ConcurrentDictionary<string, Type> SHORT_NAME_TYPE_DICTIONARY = new ConcurrentDictionary<string, Type>();

    public static List<System.Reflection.PropertyInfo> GetPropertiesList(Type target) {
        return new List<System.Reflection.PropertyInfo>(target.GetProperties());
    }

    internal static List<string> GetOwnMethodNames(Type type) {
        return (from p in new List<MethodInfo>((type).GetMethods()) where p.DeclaringType == type select p.Name).ToList();
    }

    public static bool IsPrimitive(Type type) {
        return IsPrimitive(Types.ParsePropertyType(type));
    }

    public static bool IsPrimitive(string typeName) {
        return PrimitiveTypeNames.Contains(typeName);
    }

    internal static List<string> GetPublicStaticFieldNames(Type type) {
        List<string> fieldNames = new List<string>();
        foreach (var field in type.GetFields())
        {
            if (field.IsPublic && field.IsStatic)
            {
                fieldNames.Add(field.Name);
            }
        }
        return fieldNames;
    }

    internal static object GetOwnProperties(object p, string type = "") {
        Dictionary<string, object> options = new Dictionary<string, object>();

        GetOwnPropertyNames(TypeForName(type)).ForEach(n => {
            options[n] = p.GetType().GetProperty(n).GetValue(p);
        });
        return Formating.ToJson(options);
    }

    internal static object CopyValuesFromDictionary(object searchRequest, Dictionary<string, object> dictionary) {
        ReflectionService.GetOwnPropertyNames(searchRequest).ForEach(p => {
            if (dictionary.ContainsKey(p))
                Setter.SetValue(searchRequest, p, dictionary[p]);

        });
        return searchRequest;
    }

    private static HashSet<string> ObjectMethods = new HashSet<string>() {
            "GetHashCode", "Equals", "ToString", "GetType", "ReferenceEquals" };

    public static List<object> Values(dynamic item, List<string> columns) {
        int ctn = 0;
        object[] values = new object[columns.Count()];
        foreach (string col in columns)
        {
            values[ctn++] = new ReflectionService().GetValue(item, col);
        }
        return new List<object>(values);
    }


    /// <summary>
    /// Копирование свойств обьекта
    /// </summary>
    /// <param name="item"></param>
    /// <param name="target"></param>
    public void Copy(object item, object target) {
        Type type = target.GetType();
        while (type != null)
        {
            foreach (FieldInfo field in type.GetFields())
            {
                if (field.GetValue(item) !=
                    target.GetType().GetField(field.Name).GetValue(target))
                {
                    object current,
                            prev = target.GetType().GetField(field.Name);
                    target.GetType().GetField(field.Name).SetValue(target, current = field.GetValue(item));
                    object evt = new
                    {
                        prev = prev,
                        current = current

                    };
                }
            }
            type = type.BaseType;
        }
    }

    public static List<string> GetOwnPropertyNames(object type) {
        if (type is Type)
            return (from p in new List<PropertyInfo>(((Type)type).GetProperties()) where p.DeclaringType == type select p.Name).ToList();
        else
            return (from p in new List<PropertyInfo>(type.GetType().GetProperties()) where p.DeclaringType == type select p.Name).ToList();
    }

    public static List<string> GetPropertyNames(Type type) {
        var list = (from p in new List<PropertyInfo>(type.GetProperties()) select p.Name).ToList();
        list.Reverse();
        return list;
    }
    public static List<string> GetFieldNames(Type type) {
        return (from p in new List<FieldInfo>(type.GetFields()) select p.Name).ToList();
    }

    public static void CopyValues(object item, object target) {

        foreach (string propertyName in GetPropertyNames(target.GetType()))
        {
            var itemProperty = item.GetType().GetProperty(propertyName);
            if (itemProperty != null)
            {
                object value = itemProperty.GetValue(item);
                target.GetType().GetProperty(propertyName).SetValue(target, value);
            }
        }
        foreach (string fieldName in GetFieldNames(target.GetType()))
        {
            var itemField = item.GetType().GetField(fieldName);
            if (itemField != null)
            {
                object value = itemField.GetValue(item);
                target.GetType().GetField(fieldName).SetValue(target, value);
            }
        }
    }

    public ReflectionService(ILogger<ReflectionService> logger = null) {

    }


    /// <summary>
    /// Список аргументов вызова метода
    /// </summary>
    /// <param name="method"></param>
    /// <returns></returns>
    public static List<string> GetArguments(MethodInfo method) {
        List<string> args = new List<string>();
        foreach (ParameterInfo pinfo in method.GetParameters())
        {
            args.Add(pinfo.Name);
        }
        return args;
    }

    public static Type TypeForName(string typeName) {
        if (typeName == "string") return typeof(String);
        if (typeName == "String") return typeof(String);
        if (typeName == "Int32") return typeof(int);
        if (typeName == "Int64") return typeof(long);
        if (typeName == "Boolean") return typeof(Boolean);
        if (typeName == "DateTime") return typeof(DateTime);
        if (typeName == "Decimal") return typeof(float);
        if (typeName == "JObject") return typeof(JObject);
        if (typeName == "JArray") return typeof(JArray);
        if (typeName == "JToken") return typeof(JToken);
        if (typeName == "JValue") return typeof(JValue);
        if (typeName.Contains(".") == false)
        {
            return TypeForShortName(typeName);
        }
        Type t = (from p in Assembly.GetExecutingAssembly().GetTypes() where p.FullName == typeName select p).SingleOrDefault();
        if (t == null)
        {
            t = (from p in Assembly.GetCallingAssembly().GetTypes() where p.FullName == typeName select p).SingleOrDefault();
        }
        if (t == null)
        {
            throw new Exception("Не найден тип " + typeName);
        }
        return t;
    }

    public static Type TypeForShortName(string type) {
        if (SHORT_NAME_TYPE_DICTIONARY.ContainsKey(type))
        {
            return SHORT_NAME_TYPE_DICTIONARY[type];
        }
        else
        {
            Type t = (from p in Assembly.GetExecutingAssembly().GetTypes() where p.Name == type select p).SingleOrDefault();
            if (t == null)
            {
                t = (from p in Assembly.GetCallingAssembly().GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(IAuthorizationService).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }


            if (t == null)
            {
                t = (from p in typeof(IAuthenticationService).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(IApiDescriptionGroupCollectionProvider).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(System.Buffers.IPinnable).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(IActionDescriptorProvider).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(ApplicationPartManager).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(LinkGenerator).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(ObjectPoolProvider).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(IInlineConstraintResolver).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(IServer).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
           /* if (t == null)
            {
                t = (from p in typeof(IConnectionListenerFactory).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(IApplicationBuilderFactory).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }*/
            if (t == null)
            {
                t = (from p in typeof(IHttpContextFactory).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(DiagnosticListener).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            /*if (t == null)
            {
                t = (from p in typeof(IWebHostEnvironment).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(LoggingEventSource).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(ILoggerProviderConfigurationFactory).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }*/
            if (t == null)
            {
                t = (from p in typeof(ILoggerFactory).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            /*if (t == null)
            {
                t = (from p in typeof(IHostEnvironment).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }*/
            if (t == null)
            {
                t = (from p in typeof(IConfiguration).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }
            if (t == null)
            {
                t = (from p in typeof(Microsoft.Extensions.Options.OptionsValidationException).Assembly.GetTypes() where p.Name == type select p).SingleOrDefault();
            }

            if (t == null)
            {
                throw new Exception("Не удалось найти тип " + type);
            }
            SHORT_NAME_TYPE_DICTIONARY[type] = t;
            return t;
        }
    }

    public void copyFromDictionary(object model, Dictionary<string, object> dictionaries) {
        foreach (var prop in model.GetType().GetProperties())
        {
            if (dictionaries.ContainsKey(prop.Name))
            {
                prop.SetValue(model, dictionaries[prop.Name]);
            }
        }
    }

    internal static T Create<T>(string typeName, object[] vs) {
        Type type = null;
        if (typeName.Contains("."))
        {
            type = ReflectionService.TypeForName(typeName);
        }
        else
        {
            type = ReflectionService.TypeForShortName(typeName);
        }
        return Create<T>(type, vs);
    }


    internal static T Create<T>(Type type, object[] vs) {
        ConstructorInfo constructor = (from c in new List<ConstructorInfo>(type.GetConstructors()) where c.GetParameters().Length == vs.Length select c).FirstOrDefault();
        return (T)constructor.Invoke(vs);
    }

    /// <summary>
    /// Создание новоги экземпляра класса конструктором по-умолчанию
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="type"></param>
    /// <returns></returns>
    public static T CreateWithDefaultConstructor<T>(string typeName) {
        Type type = null;
        if (typeName.Contains("."))
        {
            type = ReflectionService.TypeForName(typeName);
        }
        else
        {
            type = ReflectionService.TypeForShortName(typeName);
        }
        return CreateWithDefaultConstructor<T>(type);
    }


    /// <summary>
    /// Создание новоги экземпляра класса конструктором по-умолчанию
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="type"></param>
    /// <returns></returns>
    public static T CreateWithDefaultConstructor<T>(Type type) {
        ConstructorInfo constructor = GetDefaultConstructor(type);
        if (constructor == null)
        {
            throw new Exception($"Тип {type.Name} не обьявляет контруктор по-умолчанию");
        }
        return (T)constructor.Invoke(new object[0]);
    }


    /*/// <summary>
    /// 
    /// </summary>
    /// <param name="item"></param>s
    /// <returns></returns>
    public List<MessageAttribute > GetProperties( object item )
    {
        List<MessageAttribute > props = new List<MessageAttribute >();
        using (ApplicationDbContext db = new ApplicationDbContext())
        {             
            foreach (var prop in db.GetEntityProperties(item.GetType()))
            {                 
                string type = null;
                object val = new ReflectionService().GetValue(item, prop.Name);

                if(val!=null)
                switch (val.GetType().Name.ToLower())
                {
                    case "bool":
                    case "boolean":
                        type = "checkbox";
                        break;
                    case "string":
                    case "text":
                        type = "text";
                        break;
                    case "int":
                    case "float":
                    case "double":
                    case "decimal":
                    case "int32":
                    case "int64":
                        type = "text";
                        break;
                    case "date":
                        type = "date";
                        break;
                    case "datetime":
                        type = "datetime";
                        break;
                }

                var attributes = Attrs.ForProperty(item.GetType(), prop.Name);
                var dataType = Attrs.GetDataType(attributes);
                if (dataType != null)
                {
                    type = dataType.ToString().ToLower();
                }
                    
                props.Add(new MessageAttribute (attributes)
                {
                 
                    Label = db.GetDisplayName(item.GetType(), prop.Name),
                    Name = prop.Name,
                    Value = new ReflectionService().GetValue(item, prop.Name),
                    State = "valid",
                    Type = type
                });
                 
            }
            return props;
        }
    }*/


    /// <summary>
    /// Копирование свойств обьекта
    /// </summary>
    /// <param name="item"></param>
    /// <param name="target"></param>
    public void copy(object item, object target) {
        foreach (FieldInfo field in target.GetType().GetFields())
        {
            if (field.GetValue(item) !=
                target.GetType().GetField(field.Name).GetValue(target))
            {
                object current,
                        prev = target.GetType().GetField(field.Name);
                target.GetType().GetField(field.Name).SetValue(target, current = field.GetValue(item));
                object evt = new
                {
                    prev = prev,
                    current = current

                };
            }
        }
        foreach (PropertyInfo field in target.GetType().GetProperties())
        {
            if (field.GetValue(item) !=
                target.GetType().GetProperty(field.Name).GetValue(target))
            {
                object current,
                        prev = target.GetType().GetField(field.Name);
                target.GetType().GetProperty(field.Name).SetValue(target, current = field.GetValue(item));
                object evt = new
                {
                    prev = prev,
                    current = current

                };
            }
        }
    }

    public static object GetValueFor(object i, string v) {
        PropertyInfo propertyInfo = i.GetType().GetProperty(v);
        FieldInfo fieldInfo = i.GetType().GetField(v);
        return
            fieldInfo != null ? fieldInfo.GetValue(i) :
            propertyInfo != null ? propertyInfo.GetValue(i) :
            null;
    }

    public object GetValue(object i, string v) {
        PropertyInfo propertyInfo = i.GetType().GetProperty(v);
        FieldInfo fieldInfo = i.GetType().GetField(v);
        return
            fieldInfo != null ? fieldInfo.GetValue(i) :
            propertyInfo != null ? propertyInfo.GetValue(i) :
            null;
    }

    public static object GetSkeleton(object api) {
        return GetSkeleton(api, new List<string>());
    }

    /**
     * Метод получения семантики public-методов обьекта
     */
    public static object GetSkeleton(object subject, List<string> path) {

        Dictionary<string, object> actionMetadata = new Dictionary<string, object>();
        if (subject == null || subject.GetType().IsPrimitive || PrimitiveTypeNames.Contains(subject.GetType().Name))
        {
            return actionMetadata;
        }
        else
        {
            if (subject is Dictionary<string, object>)
            {
                foreach (var kv in ((Dictionary<string, object>)subject))
                {
                    actionMetadata[kv.Key] = kv.Value;
                    if (!kv.Value.GetType().IsPrimitive && !PrimitiveTypeNames.Contains(kv.Value.GetType().Name))
                    {

                        List<string> childPath = new List<string>(path);
                        childPath.Add(kv.Key);
                        actionMetadata[kv.Key] = GetSkeleton(kv.Value, childPath);
                    }
                };
            }
            else
            {
                //Debug.WriteLine(JObject.FromObject(subject));
                Type type = subject.GetType();
                //Debug.WriteLine(type.Name, path);
                foreach (MethodInfo info in type.GetMethods())
                {
                    if (info.IsPublic && !ObjectMethods.Contains(info.Name))
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
                        List<string> actionPath = new List<string>(path);
                        actionPath.Add(info.Name);
                        actionMetadata[info.Name] = new
                        {
                            type = "method",
                            path = actionPath,
                            args = args
                        };
                    }
                }
                foreach (FieldInfo info in type.GetFields())
                {
                    if (info.IsPublic)
                    {
                        if (!info.GetType().IsPrimitive && !PrimitiveTypeNames.Contains(info.GetType().Name))
                        {
                            List<string> childPath = new List<string>(path);
                            childPath.Add(info.Name);
                            actionMetadata[info.Name] = GetSkeleton(info.GetValue(subject), childPath);
                        }
                    }
                }
            }
        }

        return actionMetadata;
    }


    public static ConstructorInfo GetDefaultConstructor(Type type) {
        return (from c in new List<ConstructorInfo>(type.GetConstructors()) where c.GetParameters().Length == 0 select c).SingleOrDefault();
    }


    public Dictionary<string, object> GetStaticMethods(Type type) {
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

    /// <summary>
    /// <button>ok</button>
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    public List<string> GetOwnPublicMethodsNames(Type type) {
        return (from m in new List<MethodInfo>(type.GetMethods())
                where m.IsPublic &&
                        !m.IsStatic &&
                        m.DeclaringType.FullName == type.FullName
                select m.Name).ToList<string>();
    }


    /// <summary>
    /// <button>ok</button>
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    public List<MethodInfo> GetOwnPublicMethods(Type type) {
        return (from m in new List<MethodInfo>(type.GetMethods())
                where m.IsPublic &&
                        !m.IsStatic &&
                        m.DeclaringType.FullName == type.FullName
                select m).ToList<MethodInfo>();
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="method"></param>
    /// <returns></returns>
    public Dictionary<string, object> GetMethodParameters(MethodInfo method) {
        Dictionary<string, object> args = new Dictionary<string, object>();
        foreach (ParameterInfo pinfo in method.GetParameters())
        {
            args[pinfo.Name] = new
            {
                type = pinfo.ParameterType.Name,
                optional = pinfo.IsOptional,
                name = pinfo.Name
            };
        }
        return args;
    }


    public object Invoke(MethodInfo method, object target, JObject args) {
        string state = "Поиск обьекта: ";
        Dictionary<string, object> pars;
        List<object> invArgs = null;
        try
        {
            pars = JsonConvert.DeserializeObject<Dictionary<string, object>>(args.ToString());
            invArgs = new List<object>();
            foreach (ParameterInfo pinfo in method.GetParameters())
            {
                if (pinfo.IsOptional == false && pars.ContainsKey(pinfo.Name) == false)
                {
                    throw new Exception("require argument " + pinfo.Name);
                }
                string parameterName = pinfo.ParameterType.Name;

                if (parameterName.StartsWith("Dictionary"))
                {
                    Dictionary<string, object> dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(args[pinfo.Name].ToString());
                    invArgs.Add(dictionary);
                }
                else
                {
                    invArgs.Add(pars[pinfo.Name]);
                }

            }
        }
        catch (Exception ex)
        {
            throw new Exception("ArgumentsException: " + ex.Message, ex);
        }


        try
        {

            object result = method.Invoke(target, invArgs.ToArray());
            state = state.Substring(0, state.Length - 7) + "успех;";
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error in controller function: " + ex.Message);
            throw ex;
        }
    }




    /// <summary>
    /// Поиск метода 
    /// </summary>
    /// <param name="subject"></param>
    /// <param name="path"></param>
    /// <returns></returns>
    public Dictionary<string, Object> Find(object subject, string path) {
        object p = subject;
        string[] ids = path.Split('.');
        for (int i = 0; i < (ids.Length - 1); i++)
        {
            string id = ids[i];
            if (p is Dictionary<string, object>)
            {
                p = ((Dictionary<string, object>)p)[id];
            }
            else if (p is ConcurrentDictionary<string, object>)
            {
                p = ((ConcurrentDictionary<string, object>)p)[id];
            }
            else
            {
                p = p.GetType().GetField(id).GetValue(p);
            }
        }

        MethodInfo info = null;
        string methodName = ids[ids.Length - 1];

        foreach (var method in p.GetType().GetMethods())
        {
            if (String.Equals(methodName, method.Name))
            {
                info = method;
                break;
            }
        }
        Dictionary<string, Object> res = new Dictionary<string, Object>();
        res["method"] = info;
        res["target"] = p;
        res["path"] = path;


        return res;
    }





    public string GetMethodParametersBlock(MethodInfo method) {
        string s = "{";
        bool needTrim = false;
        foreach (var pair in GetMethodParameters(method))
        {
            needTrim = true;
            s += pair.Key + ':' + pair.Key + ",";
        }
        if (needTrim == true)
            return s.Substring(0, s.Length - 1) + "}";
        else
        {
            return s + "}";
        }
    }


    public string GetMethodParametersString(MethodInfo method) {
        bool needTrim = false;
        string s = "";
        foreach (var p in GetMethodParameters(method))
        {
            needTrim = true;
            s += p.Key + ",";// +":"+ p.Value + ",";
        }
        return needTrim == true ? s.Substring(0, s.Length - 1) : s;
    }


    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter) {

        throw new NotImplementedException();
    }

    public bool IsEnabled(LogLevel logLevel) {
        throw new NotImplementedException();
    }

    public IDisposable BeginScope<TState>(TState state) {
        throw new NotImplementedException();
    }


}