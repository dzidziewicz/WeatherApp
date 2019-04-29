using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Core.Model;
using WeatherApp.Core.Repositories.Interfaces;
using WeatherApp.Core.Services.Interfaces;

namespace WeatherApp.Core.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly IRepository<Weather> _repository;
        private readonly IRepository<City> _cityRepository;

        public WeatherService(IRepository<Weather> repository, IRepository<City> cityRepository)
        {
            _repository = repository;
            _cityRepository = cityRepository;
        }

        public async Task AddWithDate(Weather weather)
        {
            weather.Date = DateTime.Now;

            var city = await _cityRepository.GetAll().FirstOrDefaultAsync(c =>
                c.Name == weather.City.Name && c.CountryCode == weather.City.CountryCode);

            if (city != null)
                weather.City = city;

            await _repository.Add(weather);
        }
    }
}
