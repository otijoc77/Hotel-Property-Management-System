namespace HotelPMS.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Foreign keys
        public int CountryId { get; set; }
    }
}
