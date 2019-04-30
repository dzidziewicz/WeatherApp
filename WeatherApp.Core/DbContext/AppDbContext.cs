using Microsoft.EntityFrameworkCore;
using WeatherApp.Core.Model;

namespace WeatherApp.Core.DbContext
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<City> Cities { get; set; }
        public DbSet<Weather> Weathers { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>()
                .HasIndex(city => city.Name);
        }
    }
}
