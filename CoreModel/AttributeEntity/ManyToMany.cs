
/// <summary>
/// Маркер свойств навигации, определяющие отношения много-ко-многим
/// </summary>
public class ManyToMany: ModelCreatingAttribute
{
    
    /// <param name="includeToProperty">
    /// Имя свойства коллекцией связанных обьектов
    /// </param>
    public ManyToMany( string includeToProperty )
    {

    }
}