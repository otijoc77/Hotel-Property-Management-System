using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(Context context) : base(context)
        {
        }
    }
}
