using HotelPMS.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace HotelPMS.Hubs
{
    public class RequestHub : Hub<IRequestClient>
    {
    }
}
