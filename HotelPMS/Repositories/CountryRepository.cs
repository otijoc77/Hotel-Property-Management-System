using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class CountryRepository : RepositoryBase<Country>, ICountryRepository
    {
        public CountryRepository(Context context) : base(context)
        {
        }
    }
}
