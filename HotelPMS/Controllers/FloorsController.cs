using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorsController : ControllerBase
    {
        private readonly ILogger<FloorsController> _logger;
        private readonly IFloorService _floorService;

        public FloorsController(ILogger<FloorsController> logger, IFloorService service)
        {
            _logger = logger;
            _floorService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Floor>>> GetFloors()
        {
            return await _floorService.GetAllAsync();
        }

        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<Floor>>> GetFloors(int hotelId)
        {
            return await _floorService.GetByConditionAsync(floor => floor.HotelId == hotelId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> GetFloor(int id)
        {
            return await _floorService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Floor>> PostFloor(Floor floor)
        {
            await _floorService.CreateAsync(floor);
            return CreatedAtAction(nameof(GetFloor), new { id = floor.Id }, floor);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Floor>> DeleteFloor(int id)
        {
            return await _floorService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Floor>> PutFloor(Floor floor)
        {
            return await _floorService.UpdateAsync(floor);
        }
    }
}
