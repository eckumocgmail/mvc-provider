using ApplicationCore.Messaging;

namespace ApplicationCore.Messaging
{
    /// <summary>
    /// Интерфейс служб, сервисов, клиентов и посредников.
    /// </summary>
    public interface MessageAPI
    {
        void OnMessage(RequestMessage request, ResponseMessage response);
    }
}
