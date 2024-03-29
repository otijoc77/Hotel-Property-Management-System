﻿using HotelPMS.Models.Enums;

namespace HotelPMS.Models
{
    public class Request
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public ServiceType Type { get; set; }
        public RequestState State { get; set; }
        public string? Comment { get; set; }

        // Foreign keys
        public int SenderId { get; set; }
        public Reservation? Sender { get; set; }
        public int? EmployeeId { get; set; }
    }
}
