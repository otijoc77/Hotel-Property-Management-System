using HotelPMS.Models;
using HotelPMS.Models.Enums;
using HotelPMS.Repositories;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace HotelPMS.Services
{
    public class AccountService : IAccountService
    {
        private readonly IRepositoryWrapper _repository;

        public AccountService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Account> CreateAsync(Account item)
        {
            item.Level = AccountLevel.Client;
            item.Created = DateTime.UtcNow;
            item.Temporary = false;
            return _repository.Account.AddAsync(item);
        }

        public Task<Account> DeleteAsync(int id)
        {
            return _repository.Account.DeleteAsync(id);
        }

        public Task<List<Account>> GetAllAsync()
        {
            return _repository.Account.GetAllAsync();
        }

        public Task<List<Account>> GetByConditionAsync(Expression<Func<Account, bool>> expression)
        {
            return _repository.Account.GetByConditionAsync(expression);
        }

        public Task<Account> GetByIdAsync(int id)
        {
            return _repository.Account.GetAsync(id);
        }

        public Task<Account> UpdateAsync(Account item)
        {
            return _repository.Account.UpdateAsync(item);
        }
    }
}
