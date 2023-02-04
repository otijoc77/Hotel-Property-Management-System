using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Rating { get; set; }
        public HotelType Type { get; set; }
        public RoomClassification RoomClassification { get; set; }

        // Foreign keys
        public Company Company { get; set; }
    }
}
