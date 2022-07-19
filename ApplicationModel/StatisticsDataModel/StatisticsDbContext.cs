
using ApplicationDb.Entities;

using ApplicationModel.DataModel;
using ApplicationModel.StatisticsDataModel;

using Microsoft.EntityFrameworkCore;


using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;



public partial class ApplicationDbContext : DbContext
{
     

    public virtual DbSet<Dataset> Datasets { get; set; } 
    public virtual DbSet<DataInput> DataInputs { get; set; } 
    public virtual DbSet<Indicator> Indicators { get; set; } 
    public virtual DbSet<Location> Locations { get; set; } 
 

    
}