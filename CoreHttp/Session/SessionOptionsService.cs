/// <summary>
/// Свойства управления сеансами
/// </summary>
public class SessionOptionsService
{
    /// <summary>
    /// Время жизни сенса без активности
    /// </summary>
    public long SessionTimeout { get; set; }

    /// <summary>
    /// Длина ключа
    /// </summary>
    public int KeyLength { get; set; }

    /// <summary>
    /// Таймаут проверки
    /// </summary>
    public int CheckTimeout { get; set; }

    /// <summary>
    /// Логирование
    /// </summary>
    public bool LogEvents { get; set; }


    public SessionOptionsService()
    {     
        this.SessionTimeout = 1000000;
        this.KeyLength = 32;            
        this.CheckTimeout = 1000;
        this.LogEvents = true;
    }
     
}
