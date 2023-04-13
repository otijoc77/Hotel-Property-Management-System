using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class AccountRepository : RepositoryBase<Account>, IAccountRepository
    {
        public AccountRepository(Context context) : base(context)
        {
        }
    }
}
