using Microsoft.Extensions.Hosting;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;


public class SessionBackgroundService<T> : BackgroundService, IDisposable where T: IDisposable
{
    private readonly SessionSingletonService<T> _application;
    private readonly SessionOptionsService _options;    


    public SessionBackgroundService(  SessionSingletonService<T> application, SessionOptionsService options )
    {
        this._application = application;
        this._options = options;                
    }


    /// <summary>
    /// Выполнение фоновой задачи до тех пор пока не получен запрос на прерывание
    /// </summary>
    /// <param name="stoppingToken"> токен управления потоком </param>
    /// <returns></returns>
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            if (this._options.LogEvents)
            {
                Debug.WriteLine("DoCheck..");
            }
            Thread.Sleep(_options.CheckTimeout);
            await this.DoCheck();
        }
    }


    /// <summary>
    /// Выполнение проверки активности обьектов 
    /// </summary>        
    private async Task DoCheck()
    {                 
        await _application.DoCheck(_options.SessionTimeout);            
    }



    /// <summary>
    /// Уничтожение сервиса
    /// </summary>
    public override void Dispose()
    {           
        base.Dispose();
    }
         
}


