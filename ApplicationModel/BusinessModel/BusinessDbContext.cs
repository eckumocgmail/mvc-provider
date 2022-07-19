using Microsoft.EntityFrameworkCore;

public partial class ApplicationDbContext : DbContext
{

    public virtual DbSet<MessageAttribute> MessageAttributes { get; set; }
    public virtual DbSet<MessageProperty> MessageProperties { get; set; }
    public virtual DbSet<MessageProtocol> MessageProtocols { get; set; }
    public virtual DbSet<ValidationModel> ValidationModels { get; set; }
}