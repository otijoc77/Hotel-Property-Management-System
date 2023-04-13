using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class RequestRepository : RepositoryBase<Request>, IRequestRepository
    {
        public RequestRepository(Context context) : base(context)
        {
        }
    }
}
