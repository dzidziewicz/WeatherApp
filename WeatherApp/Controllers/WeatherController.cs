using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Core.Model;
using WeatherApp.Core.Repositories.Interfaces;
using WeatherApp.Core.Services.Interfaces;
using WeatherApp.ViewModels;

namespace WeatherApp.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class WeatherController : Controller
    {
        private readonly IRepository<Weather> _repository;
        private readonly IWeatherService _service;

        public WeatherController(IRepository<Weather> repository, IWeatherService service)
        {
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repository.GetAll().Select(w => new WeatherViewModel(w)).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var weather = await _repository.GetById(id);

            if (weather != null) return Ok(new WeatherViewModel(weather));

            return NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Add([FromBody] WeatherViewModel weatherVm)
        {
            if (ModelState.IsValid)
            {
                await _service.AddWithDate(weatherVm.ToBaseModel());
                return Ok();

            }

            return BadRequest();
        }
    }
}
