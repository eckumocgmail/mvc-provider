using Microsoft.AspNetCore.SignalR;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR.DataTransport.Signalr
{
    public class HubServer: Hub
    {

        

        public string Request(string RequestText)
        {
            Console.WriteLine("Requesting: \n" + RequestText);
            DataRequestMessage RequestMessage = Deserrialize(RequestText);

            DataResponseMessage ResponseMessage = ExecuteRequest(RequestMessage);
            string ResponseText = JObject.FromObject(ResponseMessage).ToString();
            Clients.Caller.SendAsync("Response", ResponseText);
            return RequestText;
        }


        private DataResponseMessage ExecuteRequest(DataRequestMessage RequestMessage)
        {
            object MessageObject = Invoke(RequestMessage.ActionName, RequestMessage.MessageObject);
            return new DataResponseMessage()
            {
                ActionStatus = "Success",
                SerialKey = RequestMessage.SerialKey,
                RequestMessage = RequestMessage,
                MessageObject = MessageObject                
            };
        }


        private object Invoke(string actionName, Dictionary<string, object> messageObject)
        {
        
            object result = GetType().GetMethod(actionName).Invoke(this, messageObject.Values.ToArray());
            return new
            {
                ActionName = actionName,
                Parameters = messageObject,
                Result = result
            };
        }




        private static DataRequestMessage Deserrialize(string json)
        {
            try
            {
                return JsonConvert.DeserializeObject<DataRequestMessage>(json);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Не удалось сериализовать сообщение с параметрами запроса: " + ex.Message);
                throw;
            }
        }
    }
}
