using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IRepositoryWrapper _repository;

        public ReservationService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Reservation> CreateAsync(Reservation item)
        {
            item.Registered = DateTime.UtcNow;
            return _repository.Reservation.AddAsync(item);
        }

        public async Task<Reservation> DeleteAsync(int id)
        {
            List<Request> requests = await _repository.Request.GetByConditionAsync(request => request.SenderId == id);
            foreach (Request request in requests)
            {
                await _repository.Request.DeleteAsync(request.Id);
            }
            Reservation reservation = await _repository.Reservation.DeleteAsync(id);
            _repository.Save();
            return reservation;
        }

        public Task<List<Reservation>> GetAllAsync()
        {
            return _repository.Reservation.GetAllAsync();
        }

        public Task<List<Reservation>> GetByConditionAsync(Expression<Func<Reservation, bool>> expression)
        {
            return _repository.Reservation.GetByConditionAsync(expression);
        }

        public Task<Reservation> GetByIdAsync(int id)
        {
            return _repository.Reservation.GetAsync(id);
        }

        public Task<Reservation> UpdateAsync(Reservation item)
        {
            return _repository.Reservation.UpdateAsync(item);
        }
    }
}
