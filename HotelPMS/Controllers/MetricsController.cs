using HotelPMS.Models;
using HotelPMS.Models.DataTransferObjects;
using HotelPMS.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricsController : ControllerBase
    {
        private readonly ILogger<MetricsController> _logger;
        private readonly IRepositoryWrapper _repository;

        public MetricsController(ILogger<MetricsController> logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HotelMetricsDto>> GetMetrics(int id)
        {
            HotelMetricsDto metrics = new();
            metrics.HotelId = id;
            List<Floor> floors = await _repository.Floor.GetByConditionAsync(floor => floor.HotelId == id);

            int count = 0;
            List<Reservation> reservations = new();
            foreach (Floor floor in floors)
            {
                List<Room> rooms = await _repository.Room.GetByConditionAsync(room => room.FloorId == floor.Id);
                count += rooms.Count;
                int[] roomIds = rooms.Select(r => r.Id).ToArray();
                reservations.AddRange(await _repository.Reservation.GetByConditionAsync(r => roomIds.Contains(r.Id)));
            }
            metrics.Rooms = count;
            metrics.CurrentlyBooked = reservations.Where(r => r.Start <= DateTime.Now && r.End >= DateTime.Now).Count();

            List<User> employees = await _repository.User.GetByConditionAsync(emp => emp.HotelId == id);
            metrics.Employees = employees.Count();

            var date = DateTime.Now;
            var firstDayOfMonth = new DateTime(date.Year, date.Month - 1, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddTicks(-1);
            List<Reservation> lastMonthReservations = reservations.Where(r => r.End <= lastDayOfMonth && r.End >= firstDayOfMonth).ToList();
            double sum = 0;
            foreach (Reservation reservation in lastMonthReservations)
            {
                Room room = await _repository.Room.GetAsync(reservation.RoomId);
                sum += room.Price * reservation.End.Subtract(reservation.Start).Days;
            }
            metrics.MonthEarnings = sum;

            List<Review> reviews = await _repository.Review.GetByConditionAsync(rev => rev.HotelId == id);
            double avg = 0;
            foreach (Review review in reviews)
            {
                avg += review.Rating;
            }
            avg /= reviews.Count;
            metrics.AverageRating = avg;

            return metrics;
        }
    }
}
