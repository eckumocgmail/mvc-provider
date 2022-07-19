
using ApplicationDb.Entities;

using ApplicationModel.DataModel;

using Microsoft.EntityFrameworkCore;


using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;



public partial class ApplicationDbContext : DbContext
{
     

    public virtual DbSet<News> News { get; set; } 
    public virtual DbSet<ImageResource> ImageResources { get; set; } 
    public virtual DbSet<Resource> Resources { get; set; }
    public virtual DbSet<Calendar> Calendars { get; set; }
    public virtual DbSet< BusinessFunction> BusinessFunctions { get; set; }
    public virtual DbSet<GroupsBusinessFunction> GroupsBusinessFunctions { get; set; }

    
}