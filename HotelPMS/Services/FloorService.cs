using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class FloorService : IFloorService
    {
        private readonly IRepositoryWrapper _repository;

        public FloorService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Floor> CreateAsync(Floor floor)
        {
            return _repository.Floor.AddAsync(floor);
        }

        public async Task<Floor> DeleteAsync(int id)
        {
            List<Room> rooms = await _repository.Room.GetByConditionAsync(room => room.FloorId == id);
            foreach (Room item in rooms)
            {
                await _repository.Room.DeleteAsync(item.Id);
            }
            return await _repository.Floor.DeleteAsync(id);
        }

        public async Task<List<Floor>> GetAllAsync()
        {
            List<Floor> floors = await _repository.Floor.GetAllAsync();
            foreach (Floor item in floors)
            {
                item.Rooms = await _repository.Room.GetByConditionAsync(room => room.FloorId == item.Id);
            }
            return floors;
        }

        public async Task<List<Floor>> GetByConditionAsync(Expression<Func<Floor, bool>> expression)
        {
            List<Floor> floors = await _repository.Floor.GetByConditionAsync(expression);
            foreach (Floor item in floors)
            {
                item.Rooms = await _repository.Room.GetByConditionAsync(room => room.FloorId == item.Id);
            }
            return floors;
        }

        public Task<Floor> GetByIdAsync(int id)
        {
            return _repository.Floor.GetAsync(id);
        }

        public Task<Floor> UpdateAsync(Floor item)
        {
            return _repository.Floor.UpdateAsync(item);
        }
    }
}
