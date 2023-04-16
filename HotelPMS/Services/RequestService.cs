using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class RequestService : IRequestService
    {
        private readonly IRepositoryWrapper _repository;

        public RequestService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Request> CreateAsync(Request item)
        {
            item.Date = DateTime.UtcNow;
            return _repository.Request.AddAsync(item);
        }

        public Task<Request> DeleteAsync(int id)
        {
            return _repository.Request.DeleteAsync(id);
        }

        public Task<List<Request>> GetAllAsync()
        {
            return _repository.Request.GetAllAsync();
        }

        public Task<List<Request>> GetByConditionAsync(Expression<Func<Request, bool>> expression)
        {
            return _repository.Request.GetByConditionAsync(expression);
        }

        public Task<Request> GetByIdAsync(int id)
        {
            return _repository.Request.GetAsync(id);
        }

        public Task<Request> UpdateAsync(Request item)
        {
            return _repository.Request.UpdateAsync(item);
        }
    }
}
