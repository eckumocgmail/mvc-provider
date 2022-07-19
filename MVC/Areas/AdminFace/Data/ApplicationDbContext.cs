using Microsoft.EntityFrameworkCore;

using ProxyGateway.Middleware;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public partial class AdminDbContext : DbContext
{

    public virtual DbSet<ProxyDataModel> ProxyUrlSegments { get; set; }

  
    public AdminDbContext(DbContextOptions<AdminDbContext> options) : base(options)
    {

    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured == false)
        {
            optionsBuilder.UseInMemoryDatabase("ApplicationDbContext");
        }
        
        //optionsBuilder.UseSqlServer("Server=kest;Database=Proxy;Trusted_Connection=True;MultipleActiveResultSets=true;");

    }
} 