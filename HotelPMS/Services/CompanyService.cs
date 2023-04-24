using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IHotelService _hotelService;
        private readonly IUserService _userService;

        public CompanyService(IRepositoryWrapper repository, IHotelService hotelService, IUserService userService)
        {
            _repository = repository;
            _hotelService = hotelService;
            _userService = userService;
        }

        public Task<Company> CreateAsync(Company company)
        {
            return _repository.Company.AddAsync(company);
        }

        public async Task<Company> DeleteAsync(int id)
        {
            await DeleteHotels(id);
            await DeleteEmployees(id);
            Company company = await _repository.Company.DeleteAsync(id);
            _repository.Save();
            return company;
        }

        public Task<List<Company>> GetAllAsync()
        {
            return _repository.Company.GetAllAsync();
        }

        public Task<List<Company>> GetByConditionAsync(Expression<Func<Company, bool>> expression)
        {
            return _repository.Company.GetByConditionAsync(expression);
        }

        public async Task<Company> GetByIdAsync(int id)
        {
            Company company = await _repository.Company.GetAsync(id);
            company.Hotels = await _repository.Hotel.GetByConditionAsync(hotel => hotel.CompanyId == company.Id);
            company.Employees = await _repository.User.GetByConditionAsync(user => user.CompanyId == company.Id);
            return company;
        }

        public Task<Company> UpdateAsync(Company company)
        {
            return _repository.Company.UpdateAsync(company);
        }

        private async Task<List<Hotel>> DeleteHotels(int id)
        {
            List<Hotel> hotels = await _repository.Hotel.GetByConditionAsync(hotel => hotel.CompanyId == id);
            foreach (Hotel hotel in hotels)
            {
                await _hotelService.DeleteAsync(hotel.Id);
            }
            return hotels;
        }

        private async Task<List<User>> DeleteEmployees(int id)
        {
            List<User> employees = await _repository.User.GetByConditionAsync(user => user.CompanyId == id);
            foreach (User user in employees)
            {
                await _userService.DeleteAsync(user.Id);
            }
            return employees;
        }
    }
}
