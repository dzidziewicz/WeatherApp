using System;

namespace WeatherApp.Core.Model
{
    public class Weather
    {
        public int Id { get; set; }
        public double? Temp { get; set; }
        public double? Pressure { get; set; }
        public double? RainVolume { get; set; }
        public double? WindSpeed{ get; set; }
        public City City { get; set; }
        public int CityId { get; set; }
        public DateTime Date { get; set; }
    }
}
