using WeatherApp.Core.Model;

namespace WeatherApp.Core.Services.Interfaces
{
    public interface ILoginService
    {
        User Login(string username, string password);
    }
}
