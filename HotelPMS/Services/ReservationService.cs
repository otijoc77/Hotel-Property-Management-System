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
            return _repository.Reservation.AddAsync(item);
        }

        public Task<Reservation> DeleteAsync(int id)
        {
            return _repository.Reservation.DeleteAsync(id);
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
