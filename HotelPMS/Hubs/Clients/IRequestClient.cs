using HotelPMS.Models;

namespace HotelPMS.Hubs.Clients
{
    public interface IRequestClient
    {
        Task ReceiveRequest(Request message);
    }
}
