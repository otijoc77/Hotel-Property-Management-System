using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public Gender Gender { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        // Foreign keys
        public Account Account { get; set; }
        public Company? Company { get; set; }
    }
}
