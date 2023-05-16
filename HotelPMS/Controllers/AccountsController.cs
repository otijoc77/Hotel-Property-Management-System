using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase, IControllerActions<Account>
    {
        private readonly ILogger<AccountsController> _logger;
        private readonly IAccountService _accountService;

        public AccountsController(ILogger<AccountsController> logger, IAccountService service)
        {
            _logger = logger;
            _accountService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> Get()
        {
            return await _accountService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> Get(int id)
        {
            return await _accountService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Account>> Post(Account account)
        {
            await _accountService.CreateAsync(account);
            return CreatedAtAction(nameof(Get), new { id = account.Id }, account);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> Delete(int id)
        {
            return await _accountService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Account>> Put(Account account)
        {
            return await _accountService.UpdateAsync(account);
        }
    }
}
