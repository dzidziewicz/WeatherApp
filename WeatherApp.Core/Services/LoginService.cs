using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using WeatherApp.Core.Model;
using WeatherApp.Core.Options;
using WeatherApp.Core.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace WeatherApp.Core.Services
{
    public class LoginService : ILoginService
    {
        private readonly List<User> _registeredUsers;
        private readonly AppSettings _appSettings;

        public LoginService(IOptions<AppSettings> options)
        {
            _registeredUsers = options.Value.RegisteredUsers;
            _appSettings = options.Value;
        }

        public string Login(string username, string password)
        {
            // normally users would be in a database and passwords wouldn't be kept as plain text
            var user = _registeredUsers.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (user == null)   // credentials are invalid
                return null;

            return GetToken(user);
        }

        private string GetToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Audience = _appSettings.JwtAudience,
                Issuer = _appSettings.JwtIssuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
