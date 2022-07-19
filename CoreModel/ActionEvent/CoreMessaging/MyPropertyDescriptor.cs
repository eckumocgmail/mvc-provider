using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserAuthorization.Data.ActionEvent.CoreMessaging
{
    public class MyPropertyDescriptor : System.ComponentModel.PropertyDescriptor
    {
        private Type _model;
        private string _property;

        public MyPropertyDescriptor(Type model, string property): base(property, Attrs.ForPropertyLikeAttrubtes(model, property)  )
        {
            this._model = model;
            this._property = property;

        }

        public override Type ComponentType => throw new NotImplementedException();

        public override bool IsReadOnly => throw new NotImplementedException();

        public override Type PropertyType => throw new NotImplementedException();

        public override bool CanResetValue(object component)
        {
            throw new NotImplementedException();
        }

        public override object GetValue(object component)
        {
            throw new NotImplementedException();
        }

        public override void ResetValue(object component)
        {
            throw new NotImplementedException();
        }

        public override void SetValue(object component, object value)
        {
            throw new NotImplementedException();
        }

        public override bool ShouldSerializeValue(object component)
        {
            throw new NotImplementedException();
        }
    }
}
