using HotelPMS.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace HotelPMS.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly Context _context;
        public CompanyRepository(Context context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        public async Task<Company> AddAsync(Company company)
        {
            if (_context.Companies == null)
            {
                throw new Exception("Entity set 'Context.Companies' is null.");
            }
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<Company> DeleteAsync(int id)
        {
            Company company = await _context.Companies.FirstAsync(company => company.Id == id);
            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<List<Company>> GetAllAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> GetAsync(int id)
        {
            return await _context.Companies.FirstAsync(company => company.Id == id);
        }

        public Task<Company> UpdateAsync(Company item)
        {
            throw new NotImplementedException();
        }
    }
}
