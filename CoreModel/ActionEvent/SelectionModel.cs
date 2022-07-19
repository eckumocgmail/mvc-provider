using System.Collections.Generic;

/// <summary>
/// Хранит отобранные элементы
/// </summary>
public class SelectionModel: List<ViewItem>, ISelectionModel<ViewItem>
{
    public SelectionModel(): base()
    {                
    }
}
