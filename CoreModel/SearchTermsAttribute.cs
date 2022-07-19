using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.Data.DataAttributes.AttributeEntity
{
    public class SearchTermsAttribute: Attribute
    {

        public SearchTermsAttribute(string terms) : base()
        {
            
        }
    }
}
