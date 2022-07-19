public class DataResponseMessage
{    
    public string SerialKey { get; set; }
    public object MessageObject { get; set; }
    public string ActionStatus { get; set; }
    public DataRequestMessage RequestMessage { get; set; }
    public bool Confirmed { get; set; }
}