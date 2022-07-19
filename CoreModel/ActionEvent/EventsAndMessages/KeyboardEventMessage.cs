public class KeyboardEventMessage: ViewEventMessage
{
    public string GetKeyCode(){
        return this.Data["keyCode"].ToString();
    }
}