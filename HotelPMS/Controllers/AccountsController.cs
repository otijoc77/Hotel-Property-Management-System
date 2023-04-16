using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ILogger<AccountsController> _logger;
        private readonly IAccountService _accountService;

        public AccountsController(ILogger<AccountsController> logger, IAccountService service)
        {
            _logger = logger;
            _accountService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _accountService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            return await _accountService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            await _accountService.CreateAsync(account);
            return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> DeleteAccount(int id)
        {
            return await _accountService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Account>> PutAccount(Account account)
        {
            return await _accountService.UpdateAsync(account);
        }
    }
}
