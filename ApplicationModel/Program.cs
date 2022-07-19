using System;

namespace ApplicationModel
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            using(var db = new ApplicationDbContext())
            {
                db.Database.EnsureCreated();
            }
        }
    }
}
