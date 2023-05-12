using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq;
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

        public async Task<Request> CreateAsync(Request item)
        {
            item.Date = DateTime.UtcNow;
            item.Sender = await _repository.Reservation.GetAsync(item.SenderId);
            return await _repository.Request.AddAsync(item);
        }

        public Task<Request> DeleteAsync(int id)
        {
            return _repository.Request.DeleteAsync(id);
        }

        public async Task<List<Request>> GetAllAsync()
        {
            List<Request> list = await _repository.Request.GetAllAsync();
            foreach (Request item in list)
            {
                item.Sender = await _repository.Reservation.GetAsync(item.SenderId);
            }
            return list;
        }

        public Task<List<Request>> GetByConditionAsync(Expression<Func<Request, bool>> expression)
        {
            return _repository.Request.GetByConditionAsync(expression);
        }

        public async Task<List<Request>> GetByFunctionAsync(Func<Request, bool> expression)
        {
            List<Request> list = await _repository.Request.GetAllAsync();
            foreach (Request item in list)
            {
                item.Sender = await _repository.Reservation.GetAsync(item.SenderId);
                item.Sender.Room = null;
            }
            return list.Where(expression).ToList();
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
