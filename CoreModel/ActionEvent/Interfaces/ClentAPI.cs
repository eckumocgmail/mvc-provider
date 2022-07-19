using System;



public interface ConnectionEvents
{
    string OnConnected(string token);
}


public interface IModalDialogAPI
{
    bool InfoDialog(string Title, string Text, string Button);
    void ShowHelp(string Text);
    bool RemoteDialog(string Title, string Url);
    bool ConfirmDialog(string Title, string Text);
    bool CreateEntityDialog(string Title, string Entity);
    object InputDialog(string Title, object Properties);
}



public interface IDomAPI
{
    string Eval(string js);
    string HandleEvalResult(Func<object, object> handle, string js);
    string Callback(string action, params string[] args);
    bool AddEventListener(string id, string type, string js);
    bool DispatchEvent(string id, string type, object message);
}


public interface IAngularAPI
{
    
}



public interface ClientAPI: IModalDialogAPI, IDomAPI, IAngularAPI, ConnectionEvents
{

}