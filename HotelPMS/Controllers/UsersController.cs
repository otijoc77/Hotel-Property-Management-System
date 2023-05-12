using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUserService _userService;

        public UsersController(ILogger<UsersController> logger, IUserService service)
        {
            _logger = logger;
            _userService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _userService.GetByIdAsync(id);
        }

        [HttpGet("company/{id}")]
        public async Task<ActionResult<IEnumerable<User>>> GetCompanyUsers(int id)
        {
            return await _userService.GetByConditionAsync(user => user.CompanyId == id);
        }

        [HttpGet("hotel/{id}")]
        public async Task<ActionResult<IEnumerable<User>>> GetHotelUsers(int id)
        {
            return await _userService.GetByConditionAsync(user => user.HotelId == id);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            await _userService.CreateAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            return await _userService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<User>> PutUser(User user)
        {
            return await _userService.UpdateAsync(user);
        }
    }
}
