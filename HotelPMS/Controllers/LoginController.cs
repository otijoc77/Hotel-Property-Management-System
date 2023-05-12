using HotelPMS.Models.DataTransferObjects;
using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;
using HotelPMS.Repositories;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IAccountService _accountService;
        private readonly IRepositoryWrapper _repository;

        public LoginController(ILogger<LoginController> logger, IAccountService service, IRepositoryWrapper repository)
        {
            _logger = logger;
            _accountService = service;
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<CookieDto>> Login(LoginDto dto)
        {
            List<Account> list = await _repository.Account.GetByConditionAsync(a => a.Username.Equals(dto.Username) && a.Password.Equals(dto.Password));
            if (list.Count == 0) return new CookieDto();

            CookieDto result = new CookieDto();
            result.Account = list.First();

            List<User> users = await _repository.User.GetByConditionAsync(u => u.AccountId == result.Account.Id);
            result.UserId = users.First().Id;
            result.CompanyId = users.First().CompanyId;
            result.HotelId = users.First().HotelId;

            return result;
        }
    }
}
