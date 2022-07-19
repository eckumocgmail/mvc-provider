using System.Collections.Generic;

public class ContextMenu
{
    public string Label { get; internal set; }
    public System.Action<object> OnClick { get; internal set; }
    public List<ContextMenu> Items { get; internal set; }
}