using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class ReservationRepository : RepositoryBase<Reservation>, IReservationRepository
    {
        public ReservationRepository(Context context) : base(context)
        {
        }
    }
}
