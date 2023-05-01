using HotelPMS.Models;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ILogger<ReviewsController> _logger;
        private readonly IReviewService _reviewService;

        public ReviewsController(ILogger<ReviewsController> logger, IReviewService service)
        {
            _logger = logger;
            _reviewService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _reviewService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            return await _reviewService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            await _reviewService.CreateAsync(review);
            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> DeleteReview(int id)
        {
            return await _reviewService.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<Review>> PutReview(Review review)
        {
            return await _reviewService.UpdateAsync(review);
        }
    }
}
