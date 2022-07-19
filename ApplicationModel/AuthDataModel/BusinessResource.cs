using ApplicationDb.Types;

using CoreModel;


public class BusinessResource : HierDictionaryTable<BusinessResource>
{
    public string Code { get; set; }


    public string GetHomeUrl()
    {
        return $"/{Code}Face/{Code}/{Code}Home";
    }
}