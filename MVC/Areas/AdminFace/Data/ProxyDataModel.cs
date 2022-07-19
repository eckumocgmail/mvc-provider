using System.ComponentModel.DataAnnotations;

namespace ProxyGateway.Middleware
{
    public class ProxyDataModel
    {
        public int ID { get; set; }


        [Display(Name = "Сегмент")]
        public string Path { get; set; }

        [Display(Name = "API-ключ")]
        public string Key { get; set; }

        [Display(Name = "URL")]           
        public string URL { get; set; }


        public bool IsSPA { get; set; }
    }
}
