using ApplicationDb.Entities;

using CoreModel;

using NetCoreConstructorAngular.Data.DataAttributes.AttributeInput;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationDb.Entities
{
    [SystemEntity()]
    public class ImageResource: BaseEntity
    {
        [NotNullNotEmpty("Необходимо указать наименование ресурса")]
        [Label("Наименование")]
        public string Name { get; set; }
         

        [Label("Тип файла")]
        [InputHidden()]

        [NotNullNotEmpty("Необходимо ввести задать тип ресурса (MimeType)")]
        public string Mime { get; set; } = "image/png";


        [Label("Файл")]
        [InputFile("")]
        public byte[] Data { get; set; }

        [Label("Дата загрузки")]
        [InputDateTime()]
        [NotInput("")]
        [NotNullNotEmpty("Необходимо указать время создания ресурса")]
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
