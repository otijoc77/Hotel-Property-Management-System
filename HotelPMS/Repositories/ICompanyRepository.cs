using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public interface ICompanyRepository
    {
        Task<Company> GetAsync(int id);
        Task<List<Company>> GetAllAsync();
        Task<Company> AddAsync(Company item);
        Task<Company> DeleteAsync(int id);
        Task<Company> UpdateAsync(Company item);
    }
}
