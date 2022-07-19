

 [EntityLabel("Иконка")]
public class InputIconAttribute : InputTypeAttribute
{
    public static string GetIconValue( object target ){
        object val = Attrs.GetValueMarkedByAttribute(target, nameof(InputIconAttribute));
        return val != null ? val.ToString(): "";
    }

    public InputIconAttribute( ) : base(InputTypes.Icon)
    {

    }
}