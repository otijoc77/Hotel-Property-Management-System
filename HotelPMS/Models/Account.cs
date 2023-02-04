using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public AccountLevel Level { get; set; }
        public DateTime Created { get; set; }
        public bool Temporary { get; set; }
    }
}
