using HotelPMS.Models;
using HotelPMS.Repositories;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly ILogger<RequestsController> _logger;
        private readonly IRequestService _requestService;

        public RequestsController(ILogger<RequestsController> logger, IRequestService service)
        {
            _logger = logger;
            _requestService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            return await _requestService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            return await _requestService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
            await _requestService.CreateAsync(request);
            return CreatedAtAction(nameof(GetRequest), new { id = request.Id }, request);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Request>> DeleteRequest(int id)
        {
            return await _requestService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Request>> PutRequest(Request request)
        {
            return await _requestService.UpdateAsync(request);
        }
    }
}
