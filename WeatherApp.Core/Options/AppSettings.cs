using System.Collections.Generic;
using WeatherApp.Core.Model;

namespace WeatherApp.Core.Options
{
    public class AppSettings
    {
        public List<User> RegisteredUsers { get; set; }
        public string Secret { get; set; }
        public string JwtIssuer { get; set; }
        public string JwtAudience { get; set; }
    }
}
