using CoreModel;

using NetCoreConstructorAngular.Data.DataAttributes.AttributeInput;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationDb.Entities
{
    [EntityLabel("Бинарные данные")]
    public class Resource: BaseEntity
    {
   
        [NotNullNotEmpty("Необходимо указать наименование ресурса")]
        [Label("Наименование")]        
        public string Name { get; set; }

        [NotNull]
        [Label("Тип файла")]
        //[SelectControl("{{GetMimeTypes()}}")]
        [NotNullNotEmpty("Необходимо ввести задать тип ресурса (MimeType)")]
        public string Mime { get; set; }
 

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
