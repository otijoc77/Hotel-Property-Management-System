using HotelPMS.Models;
using System.Linq.Expressions;

namespace HotelPMS.Repositories
{
    public interface IRepositoryBase<T>
    {
        Task<T> GetAsync(int id);
        Task<List<T>> GetAllAsync();
        Task<T> AddAsync(T item);
        Task<T> DeleteAsync(int id);
        Task<T> UpdateAsync(T item);
        Task<List<T>> GetByConditionAsync(Expression<Func<T, bool>> expression);
    }
}
