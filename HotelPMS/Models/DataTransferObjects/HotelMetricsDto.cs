namespace HotelPMS.Models.DataTransferObjects
{
    public class HotelMetricsDto
    {
        public int? HotelId { get; set; }
        public int? Rooms { get; set; }
        public int? CurrentlyBooked { get; set; }
        public int? Employees { get; set; }
        public double? MonthEarnings { get; set; }
        public double? AverageRating { get; set; }
    }
}
