using System;

namespace ApplicationServices
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var email = new EmailService();
            email.SendEmail("eckumoc@gmail.com","asdas","asd");
            email.Recieve();
        }
    }
}
