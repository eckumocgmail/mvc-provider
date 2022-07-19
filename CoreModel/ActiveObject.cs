using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ApplicationDb.Types
{
    /// <summary>
    /// Абстрактный класс активных обьектов приложения( пользователи, службы ).
    /// Активные обьекты проходят процедуру авторизации в приложении.
    /// </summary>
    public abstract class ActiveObject: NamedObject
    {

        

        //[Label("Последнее посещение")]        
        public long LastActive { get; set; }


        //[Label("Онлайн")]
        public bool IsActive { get; set; }


        //[Label("Секретный ключ")]
        public string SecretKey { get; set; }
      
    }
}
