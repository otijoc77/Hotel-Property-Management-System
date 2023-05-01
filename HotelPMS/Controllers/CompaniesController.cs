using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ILogger<CompaniesController> _logger;
        private readonly ICompanyService _companyService;

        public CompaniesController(ILogger<CompaniesController> logger, ICompanyService service)
        {
            _logger = logger;
            _companyService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _companyService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            return await _companyService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            await _companyService.CreateAsync(company);
            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Company>> DeleteCompany(int id)
        {
            return await _companyService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Company>> PutCompany(Company company)
        {
            return await _companyService.UpdateAsync(company);
        }
    }
}
