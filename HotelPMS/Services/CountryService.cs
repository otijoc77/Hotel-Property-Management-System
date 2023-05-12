using HotelPMS.Models;
using HotelPMS.Repositories;
using System.Linq.Expressions;

namespace HotelPMS.Services
{
    public class CountryService : ICountryService
    {
        private readonly IRepositoryWrapper _repository;

        public CountryService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public Task<Country> CreateAsync(Country country)
        {
            return _repository.Country.AddAsync(country);
        }

        public async Task<Country> DeleteAsync(int id)
        {
            List<City> cities = await _repository.City.GetByConditionAsync(city => city.CountryId == id);
            foreach (City city in cities)
            {
                await _repository.City.DeleteAsync(city.Id);
            }
            Country country = await _repository.Country.DeleteAsync(id);
            _repository.Save();
            return country;
        }

        public async Task<List<Country>> GetAllAsync()
        {
            List<Country> countries = await _repository.Country.GetAllAsync();
            return countries.OrderByDescending(country => country.Name).ToList();
        }

        public Task<List<Country>> GetByConditionAsync(Expression<Func<Country, bool>> expression)
        {
            return _repository.Country.GetByConditionAsync(expression);
        }

        public Task<Country> GetByIdAsync(int id)
        {
            return _repository.Country.GetAsync(id);
        }

        public Task<Country> UpdateAsync(Country country)
        {
            return _repository.Country.UpdateAsync(country);
        }
    }
}
