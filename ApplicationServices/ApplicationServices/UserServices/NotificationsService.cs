using System.Collections.Concurrent;


public class NotificationsService: INotificationsService
{

    private readonly SessionTransientService<ViewContextDefault> _request;
    private readonly ConcurrentDictionary<string, object> session = new ConcurrentDictionary<string, object>();


    public NotificationsService(SessionTransientService<ViewContextDefault> request)
    {
        _request = request;
    }


    public void Error( string title )
    {
        AddNotification(new NotificationMessage() { 
            Title = title,
            Type="Error"
        });
    }


    public void Info( string title )
    {
        AddNotification(new NotificationMessage() { 
            Title = title
        });   
    }

     
    public void AddNotification(NotificationMessage message)
    {
        GetQueue().Enqueue(message);
    }


    private NotificationsQueue GetQueue()
    {
        SessionContext<ViewContextDefault> session = _request.GetSession();
        NotificationsQueue queue = (NotificationsQueue)session.Get(typeof(NotificationsQueue));
        return queue;
    }

   
    public NotificationMessage[] GetNotifications()
    {
        NotificationsQueue q = GetQueue();
        NotificationMessage[] messages = q.ToArray();
        q.Clear();
        return messages;
    }   
}

