﻿namespace HotelPMS.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime Registered { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        // Foreign keys
        public User User { get; set; }
        public Hotel Hotel { get; set; }
        public Room Room { get; set; }
    }
}