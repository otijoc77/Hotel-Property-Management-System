namespace HotelPMS.Repositories
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        IAccountRepository Account { get; }
        ICompanyRepository Company { get; }
        IHotelRepository Hotel { get; }
        IFloorRepository Floor { get; }
        IRoomRepository Room { get; }
        ICountryRepository Country { get; }
        ICityRepository City { get; }
        IRequestRepository Request { get; }
        IReservationRepository Reservation { get; }
        IReviewRepository Review { get; }
        void Save();
    }
}
