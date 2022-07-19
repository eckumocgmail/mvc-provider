using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;

public class RequestMessage
{    
    [NotNullNotEmpty("Необходимо задать иденификатор запроса")]
    public string SerialKey { get; set; }

    [NotNullNotEmpty("Необходимо задать наименование операции")]
    public string ActionName { get; set; }

    [Label("Фактические аргументы выполнения операции")]
    [NotNullNotEmpty("Необходимо задать фактические аргументы выполнения операции")]
    public object MessageObject { get; set; }
    

    public Dictionary<string, object> GetDictionary()
    {
        return JsonConvert.DeserializeObject<Dictionary<string, object>>(JObject.FromObject(MessageObject).ToString());
    }
}