
using ApplicationDb.Entities;

using ApplicationModel.DataModel;

using Microsoft.EntityFrameworkCore;


using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;



public partial class ApplicationDbContext : DbContext
{

    /// <summary>
    /// Строка подключения по-умолчанию
    /// </summary>
    public readonly static string DefaultConnectionString =
        @"Data Source=AGENT\\KILLER;InitialCatalog=model;IntegratedSecurity=True;";

    public ApplicationDbContext()
    {

    }


    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public override int SaveChanges()
    {
        try
        {
            return base.SaveChanges();
        }
        catch (Exception ex)
        {
            string details = "Операция сохранения данных не выполнена. " + ex.Message;
            while (ex != null)
            {
                ToConsole(details + "\n" + ex.Message);
                ex = ex.InnerException;
            }
            throw new Exception(details);
        }
    }

    private void ToConsole(string v)
    {
        Debug.WriteLine(v);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return base.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            string details = "Операция сохранения данных не выполнена. " + ex.Message;
            while (ex != null)
            {
                ToConsole(details + "\n" + ex.Message);
                ex = ex.InnerException;
            }
            throw new Exception(details);
        }

    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
             optionsBuilder.UseInMemoryDatabase(nameof(ApplicationDbContext));
            //optionsBuilder.UseSqlServer(DefaultConnectionString);
            //optionsBuilder.ConfigureWarnings(ConfigureWarnings);
            //optionsBuilder.EnableDetailedErrors(true);           
            //optionsBuilder.AddInterceptors(new IInterceptor[] { new LoggingInterceptor() });
        }
    }

    public virtual DbSet<Account> Accounts { get; set; } 
    public virtual DbSet<User> Users { get; set; } 
    public virtual DbSet<LoginFact> LoginFacts { get; set; }
    public virtual DbSet<UserGroups> UserGroups { get; set; }
    public virtual DbSet<Group> Groups { get; set; }
    public virtual DbSet<Message> Messages { get; set; }
    public virtual DbSet<Person> Persons { get; set; }
    public virtual DbSet<Settings> Settings { get; set; }
    public virtual DbSet<BusinessResource> BusinessResources { get; set; }

}