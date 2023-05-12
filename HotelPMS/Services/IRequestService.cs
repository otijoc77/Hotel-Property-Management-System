using HotelPMS.Models;

namespace HotelPMS.Services
{
    public interface IRequestService : IServiceBase<Request>
    {
        Task<List<Request>> GetByFunctionAsync(Func<Request, bool> expression);
    }
}
