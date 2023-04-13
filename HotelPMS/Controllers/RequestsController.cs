using HotelPMS.Models;
using HotelPMS.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly ILogger<RequestsController> _logger;
        private readonly IRepositoryWrapper _requestRepository;

        public RequestsController(ILogger<RequestsController> logger, IRepositoryWrapper service)
        {
            _logger = logger;
            _requestRepository = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            return await _requestRepository.Request.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            return await _requestRepository.Request.GetAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
            await _requestRepository.Request.AddAsync(request);
            return CreatedAtAction(nameof(GetRequest), new { id = request.Id }, request);
        }
    }
}
