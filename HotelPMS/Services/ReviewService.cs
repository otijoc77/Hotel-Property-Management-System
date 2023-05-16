using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IRepositoryWrapper _repository;

        public ReviewService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Review> CreateAsync(Review item)
        {
            item.Date = DateTime.UtcNow;
            return _repository.Review.AddAsync(item);
        }

        public Task<Review> DeleteAsync(int id)
        {
            return _repository.Review.DeleteAsync(id);
        }

        public Task<List<Review>> GetAllAsync()
        {
            return _repository.Review.GetAllAsync();
        }

        public Task<List<Review>> GetByConditionAsync(Expression<Func<Review, bool>> expression)
        {
            return _repository.Review.GetByConditionAsync(expression);
        }

        public Task<Review> GetByIdAsync(int id)
        {
            return _repository.Review.GetAsync(id);
        }

        public Task<Review> UpdateAsync(Review item)
        {
            return _repository.Review.UpdateAsync(item);
        }
    }
}
