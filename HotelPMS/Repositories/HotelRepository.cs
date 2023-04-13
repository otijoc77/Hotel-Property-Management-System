using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class HotelRepository : RepositoryBase<Hotel>, IHotelRepository
    {
        public HotelRepository(Context context) : base(context)
        {
        }
    }
}
