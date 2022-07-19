using CoreModel;

namespace ApplicationDb.Entities
{
    public class UserGroups : BaseEntity
    {
        public int GroupID { get; set; }
        public int UserID { get; set; }
    }
}