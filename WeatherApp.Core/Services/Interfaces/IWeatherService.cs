using System.Threading.Tasks;
using WeatherApp.Core.Model;

namespace WeatherApp.Core.Services.Interfaces
{
    public interface IWeatherService
    {
        Task AddWithDate(Weather weather);
    }
}
