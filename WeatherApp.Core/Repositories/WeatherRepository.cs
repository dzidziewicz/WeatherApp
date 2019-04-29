using System.Linq;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Core.DbContext;
using WeatherApp.Core.Model;

namespace WeatherApp.Core.Repositories
{
    public class WeatherRepository : Repository<Weather>
    {
        public WeatherRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public override IQueryable<Weather> GetAll()
        {
            return base.GetAll().Include(w => w.City);
        }
    }
}
