using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Http.Connections.Client;
using Microsoft.AspNetCore.SignalR.Client;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

public class HubClient : AsyncContext
{
    private readonly string _Url;
    private readonly IHubConnectionBuilder _Builder;

    private HubConnection Connection;
    private string Token;

    public HashSet<string> Public { get; set; }
    public bool _Logging = false;
    public HubClient(string Url= "https://localhost:44301/App")
    {
        _Url = Url;
        _Builder = new HubConnectionBuilder().WithUrl(this._Url, Configure);
    }


    public async Task Connect()
    {
        if (_Logging)
            Debug.WriteLine("Connecting to URL: "+_Url);
        Connection = _Builder.Build();
        Connection.On<string>("Response", OnResponse);
        var ctrl = this;
        foreach(string action in Public)
        {
            var method = GetType().GetMethod(action);
            Connection.On<object>(action, (args)=> {
                method.Invoke(ctrl, new object[] { args.ToString() });
            });
        }
        Connection.Closed += async (Exception exception) =>
        {
            Debug.WriteLine(exception);
            await Task.Delay(new Random().Next(0, 5) * 1000);
            await Connection.StartAsync();
        };
        await Connection.StartAsync();
        if (_Logging)
            Debug.WriteLine("Connected to URL: " + _Url);
    }


     



    public void Configure(HttpConnectionOptions options)
    {
        options.SkipNegotiation = true;
        options.Transports = HttpTransportType.WebSockets;
    }


    private void OnResponse(string ResponseText)
    {
        if (_Logging)
            Debug.WriteLine("Handling Response: \n" + ResponseText);
        DataResponseMessage ResponseMessage = JsonConvert.DeserializeObject<DataResponseMessage>(ResponseText);
        var Todo = Take(ResponseMessage.SerialKey);
        if (ResponseMessage.ActionStatus == "Success")
        {
            if (_Logging)
                Debug.WriteLine("Handled Response: \n" + ResponseText);
            Todo(ResponseMessage.MessageObject);
        }
        else
        {
            Debug.WriteLine("Операция не выполнена: "+ ResponseMessage.SerialKey);
        }        
    }

     

    public async Task Request(string Action, Dictionary<string,object> Message, Action<object> Handle)
    {
        if(_Logging)
            Debug.WriteLine("Requesting: \n"+ JObject.FromObject(Message).ToString());
        string SerialKey = Put(Handle);
        var RequestMessage = new DataRequestMessage() {
            SerialKey = SerialKey,
            MessageObject = Message,            
            ActionName = Action,
            AccessToken = Token
        };
        string RequestText = JObject.FromObject(RequestMessage).ToString();        
        if(Connection != null)
        {
            await Connection.InvokeAsync("Request", RequestText);
            if (_Logging)
                Debug.WriteLine("Requested: \n" + RequestText);

        }
    }


    public async Task InvokeAsync(string action, params object[] args)
    {
        Debug.WriteLine($"InvokeAsync({action}, ... )");
        if(Connection == null || Connection.State != HubConnectionState.Connected)
        {
            throw new Exception("Is not connected now");
        }
        else
        {
            await Connection.InvokeAsync(action, args);
        }
        
    }

}
