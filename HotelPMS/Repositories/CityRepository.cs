using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class CityRepository : RepositoryBase<City>, ICityRepository
    {
        public CityRepository(Context context) : base(context)
        {
        }
    }
}
