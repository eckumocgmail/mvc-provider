using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.Data.DataAttributes.AttributeInput
{

    [EntityLabel("Файл")]
    public class InputFileAttribute: InputTypeAttribute
    {
        public InputFileAttribute() : base(InputTypes.File) { }
        public InputFileAttribute(string exts) : base(InputTypes.File)
        {

        }
    }
}
