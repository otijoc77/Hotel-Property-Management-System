using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase, IControllerActions<Review>
    {
        private readonly ILogger<ReviewsController> _logger;
        private readonly IReviewService _reviewService;

        public ReviewsController(ILogger<ReviewsController> logger, IReviewService service)
        {
            _logger = logger;
            _reviewService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> Get()
        {
            return await _reviewService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> Get(int id)
        {
            return await _reviewService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Review>> Post(Review review)
        {
            await _reviewService.CreateAsync(review);
            return CreatedAtAction(nameof(Get), new { id = review.Id }, review);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> Delete(int id)
        {
            return await _reviewService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Review>> Put(Review review)
        {
            return await _reviewService.UpdateAsync(review);
        }
    }
}
