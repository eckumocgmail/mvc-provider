using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreHttp.Session
{
    public class UserModelsService: IServiceProvider
    {
        public IServiceProvider ServiceProvider { get; }
        public ILogger<UserModelsService> Logger { get; }

        public UserModelsService(ILogger<UserModelsService> Logger,  IServiceProvider ServiceProvider)
        {
            this.ServiceProvider = ServiceProvider;
            this.Logger = Logger;
        }


        public object GetService(Type serviceType)
        {
            object result = null;
            try
            {
                this.Logger.LogInformation($"GetService({serviceType.Name})");
                result = ServiceProvider.GetService(serviceType);
            }
            catch(Exception ex)
            {
                this.Logger.LogInformation($"Не удалось получить зависимость {serviceType.Name} {ex.Message}");
            }
            return result;
        }
    }
}
