namespace ApplicationCore.Messaging
{ 
    public class ResponseMessage
    {

        /// <summary>
        /// true, если ответ был получен
        /// </summary>
        public bool confirmed { get; set; }
        public RequestMessage request { get; set; }
        public object data { get; set; }
        public long time { get; set; }
        public string message { get; set; }
        public string status { get; set; }
        public string stack { get; set; }
        


        /// <summary>
        /// Перенос данных из другого сообщения
        /// </summary>
        /// <param name="response"></param>
        public void Resolve(ResponseMessage response)
        {
            this.message = response.message;
            this.status = response.status;
            this.confirmed = response.confirmed;
            this.request = response.request;
            this.data = response.data;
            this.time = response.time;
        }
    }
}
