using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase, IControllerActions<Room>
    {
        private readonly ILogger<RoomsController> _logger;
        private readonly IRoomService _roomService;

        public RoomsController(ILogger<RoomsController> logger, IRoomService service)
        {
            _logger = logger;
            _roomService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> Get()
        {
            return await _roomService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> Get(int id)
        {
            return await _roomService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Room>> Post(Room room)
        {
            await _roomService.CreateAsync(room);
            return CreatedAtAction(nameof(Get), new { id = room.Id }, room);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Room>> Delete(int id)
        {
            return await _roomService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Room>> Put(Room room)
        {
            return await _roomService.UpdateAsync(room);
        }
    }
}
