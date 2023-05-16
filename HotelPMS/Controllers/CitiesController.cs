using HotelPMS.Models;
using HotelPMS.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase, IControllerActions<City>
    {
        private readonly ILogger<CitiesController> _logger;
        private readonly IRepositoryWrapper _cityRepository;

        public CitiesController(ILogger<CitiesController> logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _cityRepository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> Get()
        {
            return await _cityRepository.City.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<City>> Get(int id)
        {
            return await _cityRepository.City.GetAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<City>> Post(City city)
        {
            await _cityRepository.City.AddAsync(city);
            return CreatedAtAction(nameof(Get), new { id = city.Id }, city);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<City>> Delete(int id)
        {
            return await _cityRepository.City.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<City>> Put(City city)
        {
            return await _cityRepository.City.UpdateAsync(city);
        }
    }
}
