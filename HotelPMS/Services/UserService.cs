using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;

        public UserService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<User> CreateAsync(User item)
        {
            return _repository.User.AddAsync(item);
        }

        public Task<User> DeleteAsync(int id)
        {
            return _repository.User.DeleteAsync(id);
        }

        public Task<List<User>> GetAllAsync()
        {
            return _repository.User.GetAllAsync();
        }

        public Task<List<User>> GetByConditionAsync(Expression<Func<User, bool>> expression)
        {
            return _repository.User.GetByConditionAsync(expression);
        }

        public Task<User> GetByIdAsync(int id)
        {
            return _repository.User.GetAsync(id);
        }

        public Task<User> UpdateAsync(User item)
        {
            return _repository.User.UpdateAsync(item);
        }
    }
}
