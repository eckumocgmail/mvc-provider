using Microsoft.AspNetCore.Mvc.ApplicationModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel
{
    public class EvenotListener : ControllerModel
    {
        public EvenotListener(TypeInfo controllerType, IReadOnlyList<object> attributes) : base(controllerType, attributes)
        {
        }
    }

    public class ApplicationDescription : IApplicationModelConvention
    {
        private readonly string _description;

        public ApplicationDescription(string description)
        {
            _description = description;
        }

 
        public void Apply(Microsoft.AspNetCore.Mvc.ApplicationModels.ApplicationModel application)
        {
           
        }
    }
}
