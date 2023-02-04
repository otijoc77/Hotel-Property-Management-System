using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Floor
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public double? Area { get; set; }
        //TODO: check type
        public List<double> Border { get; set; }

        // Foreign keys
        public Hotel Hotel { get; set; }
    }
}
