using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase, IControllerActions<Hotel>
    {
        private readonly ILogger<HotelsController> _logger;
        private readonly IHotelService _hotelService;

        public HotelsController(ILogger<HotelsController> logger, IHotelService service)
        {
            _logger = logger;
            _hotelService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> Get()
        {
            return await _hotelService.GetAllAsync();
        }

        [HttpGet("city/{city}")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels(string city)
        {
            return await _hotelService.GetByConditionAsync(hotel => hotel.City!.Name.Contains(city));
        }

        [HttpGet("company/{id}")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels(int id)
        {
            return await _hotelService.GetByConditionAsync(hotel => hotel.CompanyId == id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> Get(int id)
        {
            return await _hotelService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Hotel>> Post(Hotel hotel)
        {
            await _hotelService.CreateAsync(hotel);
            return CreatedAtAction(nameof(Get), new { id = hotel.Id }, hotel);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Hotel>> Delete(int id)
        {
            return await _hotelService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Hotel>> Put(Hotel hotel)
        {
            return await _hotelService.UpdateAsync(hotel);
        }
    }
}
