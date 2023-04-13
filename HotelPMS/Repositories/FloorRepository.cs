using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class FloorRepository : RepositoryBase<Floor>, IFloorRepository
    {
        public FloorRepository(Context context) : base(context)
        {
        }
    }
}
