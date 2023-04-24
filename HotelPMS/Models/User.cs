using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Gender Gender { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public ServiceType? ServiceType { get; set; }

        // Foreign keys
        public int AccountId { get; set; }
        public Account? Account { get; set; }
        public int? CompanyId { get; set; }
        public int? HotelId { get; set; }
    }
}
