using ApplicationCore.Domain;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CoreGenerator
{
    public class DotNet 
    {
        /// <summary>
        /// Выполнение инструкции через командную строку
        /// </summary>
        /// <param name="command"> команда </param>
        /// <returns></returns>
        private string Execute(string command)
        {
            ProcessStartInfo info = new ProcessStartInfo("CMD.exe", "/C " + command);

            info.RedirectStandardError = true;
            info.RedirectStandardOutput = true;
            info.UseShellExecute = false;
            System.Diagnostics.Process process = System.Diagnostics.Process.Start(info);
            string response = process.StandardOutput.ReadToEnd();
            return response;
        }

        /// <summary>
        /// Выполнение инструкции через командную строку
        /// </summary>
        /// <param name="command"> команда </param>
        /// <returns></returns>
        private void Execute(string command, Func<string, int> listener)
        {
            Thread work = new Thread(new ThreadStart(() => {
                ProcessStartInfo info = new ProcessStartInfo("CMD.exe", "/C " + command);

                info.RedirectStandardError = true;
                info.RedirectStandardOutput = true;
                info.UseShellExecute = false;
                System.Diagnostics.Process process = System.Diagnostics.Process.Start(info);
                string response = process.StandardOutput.ReadToEnd();
                listener(response);
            }));
            work.IsBackground = true;
            work.Start();
        }
    }
}
