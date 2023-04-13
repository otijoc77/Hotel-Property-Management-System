using HotelPMS.Models;
using HotelPMS.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ILogger<AccountsController> _logger;
        private readonly IRepositoryWrapper _accountRepository;

        public AccountsController(ILogger<AccountsController> logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _accountRepository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _accountRepository.Account.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            return await _accountRepository.Account.GetAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            await _accountRepository.Account.AddAsync(account);
            return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
        }
    }
}
