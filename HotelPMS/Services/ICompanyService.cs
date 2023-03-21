using HotelPMS.Models;

namespace HotelPMS.Services
{
    public interface ICompanyService
    {
        Task<Company> GetByIdAsync(int id);
        Task<List<Company>> GetAllAsync();
        Task<Company> CreateAsync(Company company);
    }
}
