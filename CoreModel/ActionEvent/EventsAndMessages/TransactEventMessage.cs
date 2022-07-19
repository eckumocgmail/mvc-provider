using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent.EventsAndMessages
{
    /// <summary>
    /// Предполагается что это сообщение проходит по всей иерархии
    /// в 2 этапа:
    /// 1) движение вверх к корневому узлу
    /// 2) регистрация сообщение при движении вниз
    /// </summary>
    public class TransactEventMessage<T>: 
                    CommonEventMessage<T> where T: 
                        BaseEventMessage 
    {
        private bool Active = false;

        public TransactEventMessage(T item) : base(item)
        {
        }

        public void Activate()
        {
            this.Active = true;
        }
        public bool IsActive()
        {
            return this.Active;
        }
    }
}
