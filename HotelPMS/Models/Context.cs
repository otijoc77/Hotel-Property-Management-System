using Microsoft.EntityFrameworkCore;

namespace HotelPMS.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        public DbSet<Company> Companies { get; set; } = null!;
    }
}
