using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class RoomService : IRoomService
    {
        private readonly IRepositoryWrapper _repository;

        public RoomService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Room> CreateAsync(Room room)
        {
            return _repository.Room.AddAsync(room);
        }

        public Task<Room> DeleteAsync(int id)
        {
            return _repository.Room.DeleteAsync(id);
        }

        public Task<List<Room>> GetAllAsync()
        {
            return _repository.Room.GetAllAsync();
        }

        public Task<List<Room>> GetByConditionAsync(Expression<Func<Room, bool>> expression)
        {
            return _repository.Room.GetByConditionAsync(expression);
        }

        public Task<Room> GetByIdAsync(int id)
        {
            return _repository.Room.GetAsync(id);
        }

        public Task<Room> UpdateAsync(Room item)
        {
            return _repository.Room.UpdateAsync(item);
        }
    }
}
