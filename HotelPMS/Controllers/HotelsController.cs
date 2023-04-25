using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly ILogger<HotelsController> _logger;
        private readonly IHotelService _hotelService;

        public HotelsController(ILogger<HotelsController> logger, IHotelService service)
        {
            _logger = logger;
            _hotelService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels()
        {
            return await _hotelService.GetAllAsync();
        }

        [HttpGet("{city}")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels(string city)
        {
            return await _hotelService.GetByConditionAsync(hotel => hotel.City!.Name.Contains(city));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            return await _hotelService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Hotel>> PostHotel(Hotel hotel)
        {
            await _hotelService.CreateAsync(hotel);
            return CreatedAtAction(nameof(GetHotel), new { id = hotel.Id }, hotel);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Hotel>> DeleteHotel(int id)
        {
            return await _hotelService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Hotel>> PutHotel(Hotel hotel)
        {
            return await _hotelService.UpdateAsync(hotel);
        }
    }
}
