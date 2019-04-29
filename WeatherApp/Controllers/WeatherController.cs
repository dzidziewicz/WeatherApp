using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Core.Model;
using WeatherApp.Core.Repositories.Interfaces;

namespace WeatherApp.Controllers
{
    [Route("[controller]")]
    public class WeatherController : Controller
    {
        private readonly IRepository<Weather> _repository;

        public WeatherController(IRepository<Weather> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Weather>> Get()
        {
            return await _repository.GetAll().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Weather> Get(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Weather weather)
        {
            if (ModelState.IsValid)
            {
                await _repository.Add(weather);
            }

            return Ok();
        }
    }
}
