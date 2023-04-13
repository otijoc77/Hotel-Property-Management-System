using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class RoomRepository : RepositoryBase<Room>, IRoomRepository
    {
        public RoomRepository(Context context) : base(context)
        {
        }
    }
}
