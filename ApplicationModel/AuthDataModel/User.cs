

using ApplicationDb.Types;

using ApplicationModel.DataModel;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace ApplicationDb.Entities
{


    /// <summary>
    /// Обьект модели пользователя сеансов
    /// </summary>
    //[EntityLabel("Пользователь")]      
    //[EntityIcon("build")]
    public class User: ActiveObject
    {
        [Label("Учетная запись")]
        public int AccountID { get; set; }

        [InputHidden(true)]
        [Label("Учетная запись")]
        public virtual Account Account { get; set; }


        [Label("Роль")]
        public int RoleID { get; set; }

        [InputHidden(true)]
        [Label("Роль")]
        public virtual BusinessResource Role { get; set; }


        [Label("Настройки")]
        public int SettingsID { get; set; }
        [Label("Настройки")]
        public virtual Settings Settings { get; set; }


        [Label("Личная инф.")]
        public int PersonID { get; set; }

        [Label("Личная инф.")]
        public virtual Person Person { get; set; }


        [NotMapped]
        [Label("Группы")]
        public virtual List<Group> Groups { get; set; }


        [Label("Группы")]
        [NotMapped]
        public int UserGroupsID { get; set; }

        [Label("Группы")]
        [ManyToMany("Groups")]
        [InputHidden(true)]
        public virtual List<UserGroups> UserGroups { get; set; }


        [Label("Кол-во посещений")]
        public int LoginCount { get; set; }





        [Label("Входящие сообщения")]
        [InverseProperty("ToUser")]
        public virtual List<Message> Inbox { get; set; }



        [Label("Исходящие сообщения")]
        [InverseProperty("FromUser")]
        public virtual List<Message> Outbox { get; set; }
        public virtual List<BusinessFunction> BusinessFunctions { get; set; }

        public string GetHomeUrl() => "/Home/Index";
        public string GetUserHomeUrl() => "/UserFace/User/UserHome";
        /*
public string GetFullName()
{
   Join("Person");
   return Person.GetFullName();
}

public User()
{            
   UserGroups = new List<UserGroups>();
   Inbox = new List<Message>();
   Outbox = new List<Message>();
   Name = "[user]";
}

public User(BusinessResource role, Person person, Account account, Settings settings)
{
   UserGroups = new List<UserGroups>();     
   Role = role;
   Person = person;
   Account = account;
   Settings = settings;
   Inbox = new List<Message>();
   Outbox = new List<Message>();
}









[NotMapped]
[Label("Выполняемые функции")]
public List<BusinessFunction> BusinessFunctions { get; set; }


public string GetHomeUrl()
{
   return $"/{this.Role.Code}Face/{this.Role.Code}/{this.Role.Code}Home";
}*/
    }

}
