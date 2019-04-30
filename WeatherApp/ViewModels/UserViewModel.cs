using WeatherApp.Core.Model;

namespace WeatherApp.ViewModels
{
    public class UserViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }

        public UserViewModel()
        {
            
        }

        public UserViewModel(User user)
        {
            Username = user.Username;
            Role = user.Role;
            Token = user.Token;
        }
    }
}
