using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly ILogger<RoomsController> _logger;
        private readonly IRoomService _roomService;

        public RoomsController(ILogger<RoomsController> logger, IRoomService service)
        {
            _logger = logger;
            _roomService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _roomService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            return await _roomService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            await _roomService.CreateAsync(room);
            return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, room);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Room>> DeleteRoom(int id)
        {
            return await _roomService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Room>> PutRoom(Room room)
        {
            return await _roomService.UpdateAsync(room);
        }
    }
}
