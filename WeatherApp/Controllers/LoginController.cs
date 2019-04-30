using Microsoft.AspNetCore.Mvc;
using WeatherApp.Core.Services.Interfaces;
using WeatherApp.ViewModels;

namespace WeatherApp.Controllers
{
    [Route("[controller]")]
    public class LoginController : Controller
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public IActionResult SignIn([FromBody] UserViewModel credentials)
        {
            if (ModelState.IsValid)
            {
                var user = _loginService.Login(credentials.Username, credentials.Password);
                if (user != null)
                    return Ok(new UserViewModel(user));
            }
            return BadRequest();
        }
    }
}
