using Newtonsoft.Json;


public class ViewPane: ViewOptions
{
    [JsonIgnore]
    public ViewItem Left { get; set; } = null;

    [JsonIgnore]
    public ViewItem Right { get; set; } = null;

    [JsonIgnore]
    public ViewItem Top { get; set; } = null;

    [JsonIgnore]
    public ViewItem Bottom { get; set; } = null;
}

