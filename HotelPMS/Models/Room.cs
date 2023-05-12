namespace HotelPMS.Models
{
    public class Room
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public double Area { get; set; }
        public int? Beds { get; set; }
        public double Price { get; set; }
        public string Type { get; set; }
        public string? Image { get; set; }
        public string Border { get; set; }
        public List<Request> ActiveRequests { get; set; } = new List<Request>();

        // Foreign keys
        public int FloorId { get; set; }
    }
}
