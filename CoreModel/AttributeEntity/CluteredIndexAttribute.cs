/// <summary>
/// Маркер свойств для которых необходимо создать некластеризованный индекс
/// </summary>
public class UncluteredIndexAttribute: ModelCreatingAttribute
{
 
    /// <summary>
    /// Таймаут чвыполнения задачи 
    /// </summary>
    /// <param name="timeout"></param>
    public UncluteredIndexAttribute(   )
    {
    }
}