namespace HotelPMS.Models
{
    public class Review
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Rating { get; set; }
        public string? Text { get; set; }
        public bool Anonymous { get; set; }

        // Foreign keys
        public int HotelId { get; set; }
        public int UserId { get; set; }
    }
}
