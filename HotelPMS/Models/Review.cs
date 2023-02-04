namespace HotelPMS.Models
{
    public class Review
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Rating { get; set; }
        public string? Text { get; set; }

        // Foreign keys
        public Hotel Hotel { get; set; }
        public User User { get; set; }
    }
}
