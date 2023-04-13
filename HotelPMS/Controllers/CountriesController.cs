using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ILogger<CountriesController> _logger;
        private readonly ICountryService _countryService;

        public CountriesController(ILogger<CountriesController> logger, ICountryService service)
        {
            _logger = logger;
            _countryService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            return await _countryService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            return await _countryService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            await _countryService.CreateAsync(country);
            return CreatedAtAction(nameof(GetCountry), new { id = country.Id }, country);
        }
    }
}
