using HotelPMS.Models;

namespace HotelPMS.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private Context _context;
        private IUserRepository _user;
        private IAccountRepository _account;
        private ICompanyRepository _company;
        private IHotelRepository _hotel;
        private IFloorRepository _floor;
        private IRoomRepository _room;
        private ICountryRepository _country;
        private ICityRepository _city;
        private IRequestRepository _request;
        private IReservationRepository _reservation;
        private IReviewRepository _review;

        public IUserRepository User
        {
            get
            {
                if (_user == null)
                {
                    _user = new UserRepository(_context);
                }
                return _user;
            }
        }

        public IAccountRepository Account
        {
            get
            {
                if (_account == null)
                {
                    _account = new AccountRepository(_context);
                }
                return _account;
            }
        }

        public ICompanyRepository Company
        {
            get
            {
                if (_company == null)
                {
                    _company = new CompanyRepository(_context);
                }
                return _company;
            }
        }

        public IHotelRepository Hotel
        {
            get
            {
                if (_hotel == null)
                {
                    _hotel = new HotelRepository(_context);
                }
                return _hotel;
            }
        }

        public IFloorRepository Floor
        {
            get
            {
                if (_floor == null)
                {
                    _floor = new FloorRepository(_context);
                }
                return _floor;
            }
        }

        public IRoomRepository Room
        {
            get
            {
                if (_room == null)
                {
                    _room = new RoomRepository(_context);
                }
                return _room;
            }
        }

        public ICountryRepository Country
        {
            get
            {
                if (_country == null)
                {
                    _country = new CountryRepository(_context);
                }
                return _country;
            }
        }

        public ICityRepository City
        {
            get
            {
                if (_city == null)
                {
                    _city = new CityRepository(_context);
                }
                return _city;
            }
        }

        public IRequestRepository Request
        {
            get
            {
                if (_request == null)
                {
                    _request = new RequestRepository(_context);
                }
                return _request;
            }
        }

        public IReservationRepository Reservation
        {
            get
            {
                if (_reservation == null)
                {
                    _reservation = new ReservationRepository(_context);
                }
                return _reservation;
            }
        }

        public IReviewRepository Review
        {
            get
            {
                if (_review == null)
                {
                    _review = new ReviewRepository(_context);
                }
                return _review;
            }
        }

        public RepositoryWrapper(Context context)
        {
            _context = context;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
