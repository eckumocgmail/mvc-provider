  
using ApplicationDb.Entities;

using ApplicationModel.DataModel;

using System;
using System.Collections.Generic;
using System.Linq;
 

namespace UserAuthorization
{

    public class ApplicationModelInitiiallizer
    {        

        public void Install()
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                IEnumerable<Type> attributes = AssemblyReader.GetInputTypeAttributes();      
                if ( db.MessageAttributes.Count() != attributes.Count())
                {
                    foreach(var attribute in attributes)
                    {
                        foreach(var m in db.MessageAttributes.ToList())
                        {
                            db.MessageAttributes.Remove(m);
                        }
                        db.MessageAttributes.Add(ConvertToMessageAttribute(attribute));
                    }
                }
                //db.BusinessResources.ToList().ForEach((p) => { db.BusinessResources.Remove(p); });             
                db.SaveChanges();
                if (db.BusinessResources.Count() == 0)
                {
                    var user = new BusinessResource() {
                        Name = "Пользователь",
                        Description = "Пользователи имеют возможность воспроизводить свои функциональные обязанности согласно информационной модели.",
                        Code = "User"
                    };
                    var dba = new BusinessResource() { 
                        Name =          "Database Administrator (DBA)", 
                        Description =   "Разрабатывает базы данных, процедуры и функции... ",
                        Code =          "DBA",
                        Parent = user
                    };   
                    var analitic = new BusinessResource() { 
                        Name =          "System Analist(SA)", 
                        Description =   "Аналитик создает отчёты", 
                        Code =          "SA",
                        Parent = user
                    };   
                    var integrator = new BusinessResource() { 
                        Name =          "System Integrator(SI)", 
                        Description =   "Аналитик создает отчёты", 
                        Code =          "SI",
                        Parent = user
                    };   


                    var dev = new BusinessResource() { 
                        Name =          "Разработчик", 
                        Description =   "Разработчик исследует бизнес процессы предприятия (IDEF0), устанавливает связи между функциональными единицами и информационными ресурсами (IDEFO, IDEF3 и DFD). " +
                                        "Проектирует инфо-логическую и дата-логическую связанность функций информационной системы с внутренними и внешними бизнес процессами предприятия. ", 
                        Code = "Dev", 
                        Parent = user };
                    var boss = new BusinessResource() { 
                        Name =          "Директор", 
                        Description =   "", 
                        Code = "Boss", 
                        Parent = user };
                    
                    db.Add(user);
                    db.Add(dba);
                    db.Add(integrator);
                    db.Add(analitic);
                    db.Add(boss);

                    db.Add(dev);
                    db.SaveChanges();
                    dba.Parent = user;
                    analitic.Parent = user;
                    dev.Parent = user;
                    db.SaveChanges();




                }





                //регистрация пользователя для этапа разработки и тестирования
                var devRole = db.BusinessResources.Where(r => r.Code == "Dev").SingleOrDefault();
                if (db.Users.Count() == 0)
                {
                    Person person = PersonNamesProvider.GetRandomPerson();
                    var registration = new RegistrationService(db, new AuthorizationOptions(), new EmailService());
                    registration.Signup(new Account("eckumoc@gmail.com", "sgdf1423"), person, devRole);
                }
            }             
        }

        internal static MessageAttribute ConvertToMessageAttribute(Type attribute)
        {
            string atrName = (attribute.GetType().Name.StartsWith("Input") ? attribute.GetType().Name.Substring("Input".Length) : attribute.GetType().Name).Replace("Attribute","");
            var icons = new MaterialIconsService();
            
            InputTypeAttribute attr = ReflectionService.CreateWithDefaultConstructor<InputTypeAttribute>(attribute);
            var res = new MessageAttribute()
            {        

                SQLType = attr.GetSqlServerDataType(),
                CSharpType = attr.GetCSTypeName(),
                SqlServerDataType = attr.GetSqlServerDataType(),
                MySQLDataType = attr.GetMySQLDataType(),
                PostgreDataType = attr.GetPostgreDataType(),
                OracleDataType = attr.GetOracleDataType(),
                Description = Attrs.LabelFor(attribute)+":\n"+Attrs.DescriptionFor(attribute),
                Icon = Attrs.IconFor(attribute),
                Name = Attrs.LabelFor(attribute ),
                InputType = (attribute.Name.StartsWith("Input") ? attribute.Name.Substring("Input".Length) : attribute.Name).Replace("Attribute", "")
            };
            if(res.Name == null)
            {
                int x = 0;
                string label = Attrs.LabelFor(attribute);
            }
            return res;
        }
    }
}
