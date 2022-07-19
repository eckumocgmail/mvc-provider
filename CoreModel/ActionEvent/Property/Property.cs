using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.Application.ActionEvent.Property
{
    public class Property<T> where T: class
    {

        private Action<PropertyChangedMessage> OnChanges = (changes) => {
            Writing.ToConsole("Изменение свойства: " + changes.Property + " с " + changes.Before + " на " + changes.After);
        };


        private object _Value { get; set; }
        public string Name { get; set; }
        public object Value 
        { 
            get
            {
                return _Value;
            }
            set
            {                
                OnChanges(new PropertyChangedMessage()
                {
                    Before = Value,
                    After = _Value = value,
                    Property = Name, 
                    Source = Owner
                }); 
            }
        }
        public T Default { get; set; }
        public object Owner { get; set; }




        public Property(object Owner, string Name)
        {
            this.Name = Name;
            this.Owner = Owner;
            this.Value = Default;
        }



        public void Bind( Property<T> target )
        {
            target.Subscribe(Listener);
        }

        private void Listener(PropertyChangedMessage message)
        {        
            if (Value.Equals(message.After) == false)
            {
                Value = message.After;
            }            
        }


        public void Subscribe(Action<PropertyChangedMessage> listener)
        {
            OnChanges += listener;
        }
    }
}
