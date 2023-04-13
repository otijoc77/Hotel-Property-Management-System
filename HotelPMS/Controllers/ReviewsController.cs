using HotelPMS.Models;
using HotelPMS.Repositories;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ILogger<ReviewsController> _logger;
        private readonly IRepositoryWrapper _reviewRepository;

        public ReviewsController(ILogger<ReviewsController> logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _reviewRepository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _reviewRepository.Review.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            return await _reviewRepository.Review.GetAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Review>> PostRoom(Review review)
        {
            await _reviewRepository.Review.AddAsync(review);
            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }
    }
}
