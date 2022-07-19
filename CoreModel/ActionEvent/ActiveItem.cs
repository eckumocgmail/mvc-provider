using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace ActionEvent
{
    /// <summary>
    /// Обьект определяет признак активной фазы жизненого цикла
    /// </summary>
    public abstract class ActiveItem: ChangeSupport
    {


        /// <summary>
        /// Признак активной фазы использования обьекта
        /// </summary>
        public bool Alive { get => Get<bool>("Alive"); set => Set<bool>("Alive", value); }

        /// <summary>
        /// Режим разработчика
        /// </summary>
        public bool DesignMode { get => Get<bool>("DesignMode"); set => Set<bool>("DesignMode", value); }


        [JsonIgnore]
        public Action<object> OnInit;

        [JsonIgnore]
        public Action<object> OnDestroy;

      
        public ActiveItem(): base()
        {
            OnInit = (message) => {            };
            OnDestroy = (message) => {            };
            DesignMode = false;
            Alive = false;
            EnableChangeSupport = true;
            InitChangeListeners();
            Changed = false;
        }

        public void InitChangeListeners()
        {
            /*foreach(var method in this.GetType().GetMethods())
            {
                var attrs = Attrs.ForMethod(GetType(), method.Name);
                if( attrs.ContainsKey(nameof(OnChangeAttribute)))
                {
                    
                    string[] properties = attrs[nameof(OnChangeAttribute)].Split(",");
                    OnChange += (message) =>
                    {
                        if(message is PropertyChangedMessage)
                        {
                            PropertyChangedMessage changed = (PropertyChangedMessage)message;
                            if(new List<string>(properties).Contains(changed.Property))
                            {
                                method.Invoke(this,new object[0]);
                            }
                        }
                    };
                }
            }*/

        }




        internal object SetDesignMode()
        {
            DesignMode = true;            
            return this;
        }

        /// <summary>
        /// Метод инициаллизации жизненого цикла
        /// </summary>
        public virtual void Init()
        {            
            Debug.WriteLine(GetType().Name + " Destroy " + GetHashCode());
            Alive = true;            
        }

        /// <summary>
        /// Метод инициаллизации жизненого цикла
        /// </summary>
        public void Destroy()
        {
            Debug.WriteLine(GetType().Name + " Destroy " + GetHashCode());
            Alive = false;
        }
    }
}
