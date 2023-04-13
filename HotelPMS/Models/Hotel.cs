using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string? Image { get; set; }
        public int? Rating { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public HotelType Type { get; set; }
        public RoomClassification RoomClassification { get; set; }
        public List<Floor> Floors { get; set; } = new List<Floor>();

        // Foreign keys
        public int CompanyId { get; set; }
        public int CityId { get; set; }
    }
}
