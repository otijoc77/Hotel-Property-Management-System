using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase, IControllerActions<Reservation>
    {
        private readonly ILogger<ReservationsController> _logger;
        private readonly IReservationService _reservationService;

        public ReservationsController(ILogger<ReservationsController> logger, IReservationService service)
        {
            _logger = logger;
            _reservationService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> Get()
        {
            return await _reservationService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> Get(int id)
        {
            return await _reservationService.GetByIdAsync(id);
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations(int id)
        {
            return await _reservationService.GetByConditionAsync(reservation => reservation.UserId.Equals(id));
        }

        [HttpGet("room/{id}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsByRoom(int id)
        {
            return await _reservationService.GetByConditionAsync(reservation => reservation.RoomId.Equals(id));
        }

        [HttpGet("hotel/{id}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsByHotel(int id)
        {
            return await _reservationService.GetByConditionAsync(reservation => reservation.HotelId.Equals(id)
                                                                                && reservation.End > DateTime.UtcNow);
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> Post(Reservation reservation)
        {
            await _reservationService.CreateAsync(reservation);
            return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Reservation>> Delete(int id)
        {
            return await _reservationService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Reservation>> Put(Reservation reservation)
        {
            return await _reservationService.UpdateAsync(reservation);
        }
    }
}
