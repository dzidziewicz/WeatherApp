using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherApp.Core.Repositories.Interfaces
{
    public interface IRepository<TType> where TType : class
    {
        Task Add(TType entity);
        Task<TType> GetById(int id);
        IQueryable<TType> GetAll();
    }
}
