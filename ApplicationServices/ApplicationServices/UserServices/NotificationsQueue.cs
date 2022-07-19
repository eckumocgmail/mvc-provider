using System.Collections.Concurrent;

public class NotificationsQueue : ConcurrentQueue<NotificationMessage>
{
    public NotificationsQueue(): base()
    {
        Writing.ToConsole($"Create {nameof(NotificationsQueue)}");
    }
}

