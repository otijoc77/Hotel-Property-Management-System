﻿using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly ILogger<ReservationsController> _logger;
        private readonly IReservationService _reservationService;

        public ReservationsController(ILogger<ReservationsController> logger, IReservationService service)
        {
            _logger = logger;
            _reservationService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _reservationService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
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

        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            await _reservationService.CreateAsync(reservation);
            return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, reservation);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Reservation>> DeleteReservation(int id)
        {
            return await _reservationService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Reservation>> PutReservation(Reservation reservation)
        {
            return await _reservationService.UpdateAsync(reservation);
        }
    }
}
