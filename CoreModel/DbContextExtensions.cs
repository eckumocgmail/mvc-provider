

using ApplicationDb.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

/// <summary>
/// Расширение класса DbContext
/// </summary>
public static class DbContextExtensions
{
    /// <summary>
    /// Нехороший способ извеления наименований сущностей
    /// </summary>
    /// <param name="subject"> контекст данных </param>
    /// <returns> множество наименований сущностей </returns>
    public static HashSet<Type> GetEntitiesTypes( this DbContext subject)
    {
        Type type = subject.GetType();
        HashSet<Type> entities = new HashSet<Type>();
        foreach (MethodInfo info in type.GetMethods())
        {
            if (info.Name.StartsWith("get_") == true && info.ReturnType.Name.StartsWith("DbSet"))
            {
                if (info.Name.IndexOf("MigrationHistory") == -1)
                {
                    entities.Add(info.ReturnType);
                }
            }
        }
        return entities;
    }


    





    public static dynamic GetDbSet (this DbContext _context, Type entityType)
    {
       
        return _context.GetDbSet(entityType.Name);
    }
    public static dynamic GetDbSet(this DbContext _context, string entityTypeShortName)
    {
        foreach (MethodInfo info in _context.GetType().GetMethods())
        {
            if (info.Name.StartsWith("get_") == true && info.ReturnType.Name.StartsWith("DbSet"))
            {
                if (info.Name.IndexOf("MigrationHistory") == -1)
                {
                    string displayName = info.ReturnType.ShortDisplayName();
                    string entityTypeName = displayName.Substring(displayName.IndexOf("<") + 1);
                    entityTypeName = entityTypeName.Substring(0, entityTypeName.IndexOf(">"));
                    if (entityTypeShortName == entityTypeName)
                    {
                        return (dynamic)info.Invoke(_context, new object[0]);
                    }
                }

            }
        }
        
        throw new Exception($"Сущность [{entityTypeShortName}] не определена в контексте базы данных");
    }

    public static dynamic GetDbSet<T>(this DbContext _context) 
    {        
       return _context.GetDbSet(typeof(T));
    }

    /// <summary>
    /// Получение первичных ключей
    /// </summary>
    /// <param name="_context"></param>
    /// <param name="entityType"></param>
    /// <returns></returns>
    public static IEnumerable<IKey> GetEntityKeys(this DbContext _context, Type entityType)
    {
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() where navs.Name == entityType.FullName select navs).SingleOrDefault();
        return entity.GetKeys();
    }




    /// <summary>
    /// Получение свойств навигации
    /// </summary>
    /// <param name="_context"></param>
    /// <param name="singleRecord"></param>
    /// <returns></returns>
    public static IEnumerable<INavigation> GetNavigationProperties(this DbContext _context, object singleRecord)
    {
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() where navs.Name == singleRecord.GetType().FullName select navs).SingleOrDefault();
        return entity.GetNavigations();
    }
    public static IEnumerable<INavigation> GetNavigationPropertiesForType(this DbContext _context, Type type)
    {
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() where navs.Name == type.FullName select navs).SingleOrDefault();
        IEnumerable<INavigation> navigations = entity.GetNavigations();
        return navigations;
    }

    


    /// <summary>
    /// Получение значения атрибута Label
    /// </summary>
    /// <param name="_context"></param>
    /// <param name="entityType"></param>
    /// <param name="nav"></param>
    /// <returns></returns>
    public static string GetDisplayName(this DbContext _context, Type entityType, string propertyName)
    {       
        string name = "";
        foreach (var prop in _context.GetEntityProperties(entityType))
        {
            if (prop.Name.Equals(propertyName + "ID") || prop.Name.Equals(propertyName))
            {
                foreach (var attr in prop.PropertyInfo.GetCustomAttributesData())
                {
                    if (attr.AttributeType.Name == "DisplayAttribute"||attr.AttributeType.Name == "DisplayNameAttribute")
                    {
                        foreach (var arg in attr.ConstructorArguments)
                        {
                            if( string.IsNullOrEmpty(name = arg.Value.ToString())==false)
                            {
                                break;
                            }
                            
                        }
                    }

                }
            }
        }
        return name;        
    }

    /// <summary>
    /// Получение значения атрибута Label
    /// </summary>
    /// <param name="_context"></param>
    /// <param name="entityType"></param>
    /// <param name="nav"></param>
    /// <returns></returns>
    public static string GetDisplayName(this DbContext _context, Type entityType, INavigation nav)
    {
        string name = "";
        foreach (var prop in _context.GetEntityProperties(entityType))
        {
            if (prop.Name.Equals(nav.Name + "ID") || prop.Name.Equals(nav.Name))
            {
                foreach (var attr in prop.PropertyInfo.GetCustomAttributesData())
                {
                    if (attr.AttributeType.Name == "DisplayNameAttribute")
                    {
                        foreach (var arg in attr.ConstructorArguments)
                        {
                            name = arg.Value.ToString();
                            break;
                        }
                    }

                }
            }
        }
        return name;


    }

    public static IEnumerable<IProperty> GetEntityProperties(this DbContext _context, Type entityType)
    {
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() where navs.Name == entityType.FullName select navs).SingleOrDefault();
        return entity.GetProperties();
    }

    public static IEnumerable<IAnnotation> GetAnnotationsForObject(this DbContext _context, object singleRecord)
    {
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() where navs.Name == singleRecord.GetType().FullName select navs).SingleOrDefault();
        return entity.GetAnnotations();
    }
    public static Dictionary<string, object> GetAnnotationsForType(this DbContext _context, Type type)
    {
        Dictionary<string, object> attributes = new Dictionary<string, object>();
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() where navs.Name == type.FullName select navs).SingleOrDefault();
        foreach(IAnnotation an in entity.GetAnnotations())
        {
            attributes[an.Name] = an.Value;
        }
        return attributes;
    }
    public static IEnumerable<IAnnotation> GetAnnotationsForType(this DbContext _context, string fullName)
    {
        IEntityType entity = (from navs in _context.Model.GetEntityTypes() 
                              where navs.Name == fullName
                              select navs).SingleOrDefault();
        return entity.GetAnnotations();
    }
    public static List<string> GetEntityTypeNames(this DbContext _context )
    {         
        return (from navs in _context.Model.GetEntityTypes() select navs.ShortName()).ToList();
    }

}

