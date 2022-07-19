
/// <summary>
/// Маркер свойств навигации, определяющие отношения один-ко-многим
/// </summary>
public class OneToMany : ModelCreatingAttribute
{

    /// <param name="includeToProperty">
    /// Имя свойства коллекцией связанных обьектов
    /// </param>
    public OneToMany(string includeToProperty)
    {

    }
}