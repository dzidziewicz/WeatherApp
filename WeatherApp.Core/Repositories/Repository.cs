using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Core.DbContext;
using WeatherApp.Core.Repositories.Interfaces;

namespace WeatherApp.Core.Repositories
{
    public class Repository<TType> : IRepository<TType> where TType : class
    {
        private readonly AppDbContext _dbContext;
        private readonly DbSet<TType> _dbSet;

        public Repository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TType>();
        }

        public virtual async Task Add(TType entity)
        {
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public virtual async Task<TType> GetById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual IQueryable<TType> GetAll()
        {
            return _dbSet.AsQueryable();
        }
    }
}
