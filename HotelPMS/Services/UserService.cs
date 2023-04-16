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

        public async Task<List<User>> GetAllAsync()
        {
            List<User> users = await _repository.User.GetAllAsync();
            foreach (User item in users)
            {
                item.Account = await _repository.Account.GetAsync(item.AccountId);
            }
            return users;
        }

        public async Task<List<User>> GetByConditionAsync(Expression<Func<User, bool>> expression)
        {
            List<User> users = await _repository.User.GetByConditionAsync(expression);
            foreach (User item in users)
            {
                item.Account = await _repository.Account.GetAsync(item.AccountId);
            }
            return users;
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
