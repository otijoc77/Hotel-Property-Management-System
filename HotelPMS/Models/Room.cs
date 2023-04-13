using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Room
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public double Area { get; set; }
        public string Type { get; set; }
        public string? Image { get; set; }
        public string Border { get; set; }

        // Foreign keys
        public int FloorId { get; set; }
    }
}
