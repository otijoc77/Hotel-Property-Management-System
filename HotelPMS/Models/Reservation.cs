namespace HotelPMS.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime? Registered { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool CheckedIn { get; set; }

        // Foreign keys
        public int UserId { get; set; }
        public User? User { get; set; }
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public int RoomId { get; set; }
        public Room? Room { get; set; }
    }
}
