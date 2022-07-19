public class UpdateWhenChangedAttribute: ViewAttribute
{
    private readonly bool _update;

    public UpdateWhenChangedAttribute(bool update)
    {
        _update = update;
    }

}