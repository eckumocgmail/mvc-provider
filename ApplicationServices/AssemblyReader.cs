using Microsoft.EntityFrameworkCore;
 
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;

 
public class AssemblyReader
{


    public static ICollection<Type> GetInputTypeAttributes(Assembly assembly)
    {
        return new List<Type>(AssemblyReader.GetTypeExtendsFrom(
               assembly,
                typeof(InputTypeAttribute).Name
        ));
    }


    public static ICollection<Type> GetDbContexts(Assembly assembly)
    {
        return new List<Type>(AssemblyReader.GetTypeExtendsFrom(
                assembly,
                typeof(DbContext).Name
        ));
    }


    /// <summary>
    /// Метод получения контроллеров объявленных в сборке 
    /// </summary>
    /// <param name="assembly"> сборка </param>
    /// <returns> множество контроллеров </returns>
    public static HashSet<Type> GetControllers()
    {
        return GetControllers(Assembly.GetExecutingAssembly());
    }


    /// <summary>
    /// Метод получения контроллеров объявленных в сборке, находящейся в файле по заданному адресу
    /// </summary>
    /// <param name="filename"> адрес файла сборки </param>
    /// <returns> множество контроллеров </returns>
    public static HashSet<Type> GetControllers(string filename)
    {
        Assembly assembly = AssemblyReader.CreateAssembly(filename);
        return GetControllers(assembly);
    }


    /// <summary>
    /// Метод получения контроллеров объявленных в сборке 
    /// </summary>
    /// <param name="assembly"> сборка </param>
    /// <returns> множество контроллеров </returns>
    public static HashSet<Type> GetControllers(Assembly assembly)
    {
        return new HashSet<Type>(AssemblyReader.GetTypeExtendsFrom(assembly, "ControllerBase"));
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="assembly"></param>
    /// <returns></returns>
    public static HashSet<string> GetControllersNames(Assembly assembly)
    {
        return AssemblyReader.GetTypeNamesExtendsFrom(assembly, "ControllerBase");
    }

    /// <summary>
    /// Метод получения Hub'ов объявленных в сборке 
    /// </summary>
    /// <param name="assembly"> сборка </param>
    /// <returns> множество Hub'ов </returns>
    public static HashSet<Type> GetHubs(Assembly assembly)
    {
        return new HashSet<Type>(AssemblyReader.GetTypeExtendsFrom(assembly, "Hub"));
    }

    internal static List<string> GetControlTypeAttributes()
    {
        return (from p in AssemblyReader.GetTypeExtendsFrom(Assembly.GetExecutingAssembly(), "ControlAttribute")
                select p.Name).ToList();
    }


    /// <summary>
    /// Поиск типа по имени
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public static Type GetTypeByName(string name)
    {
        Debug.WriteLine(
            JObject.FromObject(new
            {
                executing = (from t in new List<Type>(Assembly.GetExecutingAssembly().GetTypes()) select t.FullName).ToList<string>(),
                calling = (from t in new List<Type>(Assembly.GetCallingAssembly().GetTypes()) select t.FullName).ToList<string>(),
                entry = (from t in new List<Type>(Assembly.GetEntryAssembly().GetTypes()) select t.FullName).ToList<string>()
            }).ToString()
        );
        Type executingResult = FindType(Assembly.GetExecutingAssembly(), name);
        Type callingResult = FindType(Assembly.GetExecutingAssembly(), name);
        Type entryResult = FindType(Assembly.GetExecutingAssembly(), name);
        return executingResult!=null? executingResult: callingResult!=null? callingResult: entryResult!=null? entryResult: null;
    }


    public static Type FindType( Assembly assembly, string typeName)
    {
        foreach(Type type in assembly.GetTypes())
        {
            Debug.WriteLine(type.FullName);
            if(type.FullName == typeName)
            {
                return type;
            }
        }
        return null;
    }



    /// <summary>
    /// Метод получения сборки из файла с заданным адресом 
    /// </summary>
    /// <param name="filename"> адрес файла сборки </param>
    /// <returns> сборка </returns>
    public static Assembly CreateAssembly(string filename)
    {
        return Assembly.LoadFile(filename);
    }


    public static IEnumerable<Type> GetInputTypeAttributes()
    {
        return AssemblyReader.GetTypeExtendsFrom(typeof(ApplicationDbContext).Assembly, nameof(InputTypeAttribute));
    }





        

    public static object CreateNewInstance(string name)
    {
        Type type = GetTypeByName(name);
        ConstructorInfo constructorDefaults = (from c in new List<ConstructorInfo>(type.GetConstructors()) where c.GetParameters().Length == 0 select c).SingleOrDefault();
        return constructorDefaults.Invoke(new object[0]);
    }



  
    /// <summary>
    /// Метод поиска типов в сборке, наследованных от типа, заданного именем
    /// </summary>
    /// <param name="assembly"> сборка </param>
    /// <param name="baseType"> имя типа </param>
    /// <returns> множество типов </returns>
    public static IEnumerable<Type> GetTypeExtendsFrom(Assembly assembly, string baseType)
    {            
         
        HashSet<Type> types = new HashSet<Type>();
        Type typeOfObject = new object().GetType();
        foreach (Type type in assembly.GetTypes())
        {
            //Writing.ToConsole(type.FullName);
            Type p = type.BaseType;
            while (p != typeOfObject && p!=null)
            {
                if (p.Name == baseType)
                {
                    types.Add(type);
                    break;
                }
                p = p.BaseType;
            }
        }
        return types;
    }
    
    public static IEnumerable<Type> GetTypeExtendsFrom(string baseType)
    {
        return GetTypeExtendsFrom(Assembly.GetExecutingAssembly(), baseType);
    }
    
    /// <summary>
    /// Метод поиска имён типов в сборке, наследованных от типа, заданного именем
    /// </summary>
    /// <param name="assembly"> сборка </param>
    /// <param name="baseType"> имя типа </param>
    /// <returns> множество имён типов </returns>
    public static HashSet<string> GetTypeNamesExtendsFrom(Assembly assembly, string baseType)
    {
        HashSet<string> types = new HashSet<string>();
        Type typeOfObject = new object().GetType();
        foreach (Type type in assembly.GetTypes())
        {
            Type p = type.BaseType;
            while (p != typeOfObject)
            {
                if (p.Name == baseType)
                {
                    types.Add(type.Name);
                    break;
                }
                p = p.BaseType;
            }
        }
        return types;
    }

    internal static List<string> GetTypeNamesFromNamespace(string ns)
    {
        List<string> typeNames = new List<string>();
        foreach(var type in Assembly.GetExecutingAssembly().GetTypes())
        {
            if (type.Namespace != null && type.Namespace.StartsWith(ns))
            {
                typeNames.Add(type.Name);
            }
        }
        return typeNames;
    }
} 