using CoreModel;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ApplicationDb.Entities
{
    [EntityLabel("Сообщение об изменениях")]
    public class News: BaseEntity
    {


        [Label("Заголовок")]
        [NotNullNotEmpty("Необходимо указать заголовок сообщения")]
        public string Title { get; set; }


        [Label("Время")]
        [InputDateTime()]
        public DateTime Time { get; set; }


        [Label("Изображение")]
        public int? ImageID { get; set; }
        public virtual Resource Image { get; set; }


        [Label("URL")]
      
        [InputUrl("Значение не является URL адресом ресурса")]
        public string Href { get; set; }


        [Label("Описание")]
        [NotNullNotEmptyAttribute("Необходимо ввести описание")]
        [InputMultilineTextAttribute( )]
        public string Description { get; set; }
    }
}
