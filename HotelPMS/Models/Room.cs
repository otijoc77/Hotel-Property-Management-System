using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Room
    {
        public int Id { get; set; }
        public double Area { get; set; }
        public string Type { get; set; }
        public List<double> Border { get; set; }

        // Foreign keys
        public Floor Floor { get; set; }
    }
}
