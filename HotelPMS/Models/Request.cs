using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Request
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public ServiceType Type { get; set; }

        // Foreign keys
        public Reservation Sender { get; set; }
    }
}
