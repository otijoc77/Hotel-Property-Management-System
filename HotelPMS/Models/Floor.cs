using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Floor
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public double? Area { get; set; }
        public string Border { get; set; }
        public List<Room> Rooms { get; set; } = new List<Room>();

        // Foreign keys
        public int HotelId { get; set; }
    }
}
