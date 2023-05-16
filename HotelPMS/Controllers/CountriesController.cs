using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase, IControllerActions<Country>
    {
        private readonly ILogger<CountriesController> _logger;
        private readonly ICountryService _countryService;

        public CountriesController(ILogger<CountriesController> logger, ICountryService service)
        {
            _logger = logger;
            _countryService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> Get()
        {
            return await _countryService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> Get(int id)
        {
            return await _countryService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Country>> Post(Country country)
        {
            await _countryService.CreateAsync(country);
            return CreatedAtAction(nameof(Get), new { id = country.Id }, country);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Country>> Delete(int id)
        {
            return await _countryService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Country>> Put(Country country)
        {
            return await _countryService.UpdateAsync(country);
        }
    }
}
