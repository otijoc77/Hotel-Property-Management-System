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

        public async Task<List<Reservation>> GetByConditionAsync(Expression<Func<Reservation, bool>> expression)
        {
            List<Reservation> list = await _repository.Reservation.GetByConditionAsync(expression);
            foreach (var item in list)
            {
                await FillFields(item);
            }
            return list;
        }

        public async Task<Reservation> GetByIdAsync(int id)
        {
            Reservation item = await _repository.Reservation.GetAsync(id);
            await FillFields(item);
            return item;
        }

        public Task<Reservation> UpdateAsync(Reservation item)
        {
            return _repository.Reservation.UpdateAsync(item);
        }

        private async Task FillFields(Reservation item)
        {
            item.User = await _repository.User.GetAsync(item.UserId);
            item.Hotel = await _repository.Hotel.GetAsync(item.HotelId);
            item.Room = await _repository.Room.GetAsync(item.RoomId);
        }
    }
}
