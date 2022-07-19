using ApplicationDb.Entities;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.ApplicationServices.PublicServices
{
    public class NewsService
    {
        private readonly ApplicationDbContext _context;

        public NewsService( ApplicationDbContext context )
        {
            _context = context;
        }

        public static void WhenLaunched()
        {
            using (var _context = new ApplicationDbContext())
            {
                _context.News.Add(new News()
                {
                    Time = DateTime.Now,
                    Title = "Старт программы",
                    Description = $"Был выполнен очередной запуск программы"
                });
                _context.SaveChanges();
            }
        }
    }
}
