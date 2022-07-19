[ClassDescription(
    "Атрибут маркерует методы, "+
    "которые необходимо выполнять по наступлению события изменения модели данных")]
public class OnChangeAttribute: ViewAttribute
{

    // имя свойства - источника изменений
    private string _propertyName;

    public OnChangeAttribute(string propertyName)
    {
        _propertyName = propertyName;
    }
}