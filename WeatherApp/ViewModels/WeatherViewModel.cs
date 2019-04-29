using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherApp.Core.Model;

namespace WeatherApp.ViewModels
{
    public class WeatherViewModel
    {
        public string CityName { get; set; }
        public string CityCountryCode { get; set; }
        public double? Temp { get; set; }
        public double? Pressure { get; set; }
        public double? RainVolume { get; set; }
        public double? WindSpeed { get; set; }
        public DateTime? Date { get; set; }

        public WeatherViewModel()
        {
            
        }

        public WeatherViewModel(Weather weather)
        {
            if(weather == null) return;

            Temp = weather.Temp;
            Pressure = weather.Pressure;
            RainVolume = weather.RainVolume;
            WindSpeed = weather.WindSpeed;
            CityName = weather.City.Name;
            CityCountryCode = weather.City.CountryCode;
            Date = weather.Date;
        }

        public Weather ToBaseModel()
        {
            return new Weather
            {
                Temp = Temp,
                Pressure = Pressure,
                RainVolume = RainVolume,
                WindSpeed = WindSpeed,
                City = new City()
                {
                    Name = CityName,
                    CountryCode = CityCountryCode
                }
            };
        }
    }
}
