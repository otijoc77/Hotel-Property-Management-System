using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase, IControllerActions<Company>
    {
        private readonly ILogger<CompaniesController> _logger;
        private readonly ICompanyService _companyService;

        public CompaniesController(ILogger<CompaniesController> logger, ICompanyService service)
        {
            _logger = logger;
            _companyService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> Get()
        {
            return await _companyService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> Get(int id)
        {
            return await _companyService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Company>> Post(Company company)
        {
            await _companyService.CreateAsync(company);
            return CreatedAtAction(nameof(Get), new { id = company.Id }, company);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Company>> Delete(int id)
        {
            return await _companyService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Company>> Put(Company company)
        {
            return await _companyService.UpdateAsync(company);
        }
    }
}
