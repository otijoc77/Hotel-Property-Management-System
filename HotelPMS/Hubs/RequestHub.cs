using HotelPMS.Hubs.Clients;
using HotelPMS.Models;
using Microsoft.AspNetCore.SignalR;

namespace HotelPMS.Hubs
{
    public class RequestHub : Hub<IRequestClient>
    {
        public async Task SendMessage(Request message)
        {
            await Clients.All.ReceiveRequest(message);
        }
    }
}
