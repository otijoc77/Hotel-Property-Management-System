using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Logo { get; set; }
        public string? Description { get; set; }
        public List<Hotel> Hotels { get; set; } = new List<Hotel>();
        public List<User> Employees { get; set; } = new List<User>();
    }
}
