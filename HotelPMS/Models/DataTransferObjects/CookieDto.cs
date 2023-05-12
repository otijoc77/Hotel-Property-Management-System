namespace HotelPMS.Models.DataTransferObjects
{
    public class CookieDto
    {
        public Account Account { get; set; }
        public int UserId { get; set; }
        public int? CompanyId { get; set; }
        public int? HotelId { get; set; }
    }
}
