using System;


/// <summary>
/// Реализует методы работы с системным временем
/// </summary>
public class Timing
{

    private static long timestamp = (long)((DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0)).TotalMilliseconds);

    public static long check()
    {
        long now = GetTime();
        long longness = now - timestamp;
        timestamp = now;
        return longness;
    }


    /// <summary>
    /// Получение текущего времени в милисекундах
    /// </summary>
    /// <returns></returns>
    public static long GetTime()
    {
        TimeSpan uTimeSpan = (DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0));
        return (long)uTimeSpan.TotalMilliseconds;
    }

    /// <summary>
    /// Получение текущего времени в милисекундах
    /// </summary>
    /// <returns></returns>
    public static long GetTime(DateTime date)
    {
        TimeSpan uTimeSpan = (date - new DateTime(1970, 1, 1, 0, 0, 0));
        return (long)uTimeSpan.TotalMilliseconds;
    }



    /// <summary>
    /// Время начала сегодняшнего дня в миличекундах
    /// </summary>
    /// <returns></returns>
    public static long GetTodayBeginTime()
    {
            
        TimeSpan uTimeSpan = (DateTime.Today - new DateTime(1970, 1, 1, 0, 0, 0));
        return (long)uTimeSpan.TotalMilliseconds;
    }


    /// <summary>
    /// Метод получения наименования месяца в дательном падеже
    /// </summary>
    /// <param name="month">номер месяца</param>
    /// <returns></returns>
    public static string GetMonthName(int month)
    {
        switch( month)
        {
            case 1: return "января";
            case 2: return "февраля";
            case 3: return "марта";
            case 4: return "апреля";
            case 5: return "мая";
            case 6: return "июня";
            case 7: return "июля";
            case 8: return "августа";
            case 9: return "сентября";
            case 10: return "октября";
            case 11: return "ноября";
            case 12: return "декабря";
            default:
            {
                throw new Exception("Месяц задан неверно.");
                    
            }
        }
    }
}
