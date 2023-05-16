using HotelPMS.Hubs;
using HotelPMS.Hubs.Clients;
using HotelPMS.Models;
using HotelPMS.Models.Enums;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase, IControllerActions<Request>
    {
        private readonly ILogger<RequestsController> _logger;
        private readonly IRequestService _requestService;
        private readonly IHubContext<RequestHub, IRequestClient> _hub;

        public RequestsController(ILogger<RequestsController> logger, IRequestService service, IHubContext<RequestHub, IRequestClient> hub)
        {
            _logger = logger;
            _requestService = service;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> Get()
        {
            return await _requestService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> Get(int id)
        {
            return await _requestService.GetByIdAsync(id);
        }

        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Request>>> GetEmployeeRequests(int employeeId)
        {
            return await _requestService.GetByConditionAsync(r => r.EmployeeId == employeeId && r.State != RequestState.Closed);
        }

        [HttpPost]
        public async Task<ActionResult<Request>> Post(Request request)
        {
            await _requestService.CreateAsync(request);
            await _hub.Clients.All.ReceiveRequest(request);
            return CreatedAtAction(nameof(Get), new { id = request.Id }, request);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Request>> Delete(int id)
        {
            return await _requestService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Request>> Put(Request request)
        {
            return await _requestService.UpdateAsync(request);
        }
    }
}
