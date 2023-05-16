using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorsController : ControllerBase, IControllerActions<Floor>
    {
        private readonly ILogger<FloorsController> _logger;
        private readonly IFloorService _floorService;

        public FloorsController(ILogger<FloorsController> logger, IFloorService service)
        {
            _logger = logger;
            _floorService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Floor>>> Get()
        {
            return await _floorService.GetAllAsync();
        }

        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<Floor>>> GetFloors(int hotelId)
        {
            return await _floorService.GetByConditionAsync(floor => floor.HotelId == hotelId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> Get(int id)
        {
            return await _floorService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Floor>> Post(Floor floor)
        {
            await _floorService.CreateAsync(floor);
            return CreatedAtAction(nameof(Get), new { id = floor.Id }, floor);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Floor>> Delete(int id)
        {
            return await _floorService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Floor>> Put(Floor floor)
        {
            return await _floorService.UpdateAsync(floor);
        }
    }
}
