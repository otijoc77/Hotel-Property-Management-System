using HotelPMS.Models;
using HotelPMS.Repositories;

namespace HotelPMS.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        public CompanyService(ICompanyRepository repository)
        {
            _companyRepository = repository;
        }

        public Task<Company> CreateAsync(Company company)
        {
            return _companyRepository.AddAsync(company);
        }

        public Task<List<Company>> GetAllAsync()
        {
            return _companyRepository.GetAllAsync();
        }

        public Task<Company> GetByIdAsync(int id)
        {
            return _companyRepository.GetAsync(id);
        }
    }
}
