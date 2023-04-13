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

        public Task<Floor> DeleteAsync(int id)
        {
            return _repository.Floor.DeleteAsync(id);
        }

        public Task<List<Floor>> GetAllAsync()
        {
            return _repository.Floor.GetAllAsync();
        }

        public Task<List<Floor>> GetByConditionAsync(Expression<Func<Floor, bool>> expression)
        {
            return _repository.Floor.GetByConditionAsync(expression);
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
