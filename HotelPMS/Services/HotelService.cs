using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class HotelService : IHotelService
    {
        private readonly IRepositoryWrapper _repository;

        public HotelService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Hotel> CreateAsync(Hotel hotel)
        {
            return _repository.Hotel.AddAsync(hotel);
        }

        public Task<Hotel> DeleteAsync(int id)
        {
            return _repository.Hotel.DeleteAsync(id);
        }

        public Task<List<Hotel>> GetAllAsync()
        {
            return _repository.Hotel.GetAllAsync();
        }

        public Task<List<Hotel>> GetByConditionAsync(Expression<Func<Hotel, bool>> expression)
        {
            return _repository.Hotel.GetByConditionAsync(expression);
        }

        public async Task<Hotel> GetByIdAsync(int id)
        {
            Hotel hotel = await _repository.Hotel.GetAsync(id);
            hotel.Floors = await _repository.Floor.GetByConditionAsync(floor => floor.HotelId == hotel.Id);
            hotel.Reviews = await _repository.Review.GetByConditionAsync(review => review.HotelId == hotel.Id);
            return hotel;
        }

        public Task<Hotel> UpdateAsync(Hotel item)
        {
            return _repository.Hotel.UpdateAsync(item);
        }
    }
}
