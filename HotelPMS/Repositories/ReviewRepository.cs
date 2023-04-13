using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class ReviewRepository : RepositoryBase<Review>, IReviewRepository
    {
        public ReviewRepository(Context context) : base(context)
        {
        }
    }
}
