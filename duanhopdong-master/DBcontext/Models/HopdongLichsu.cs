using System;
using System.Collections.Generic;

namespace DBcontext.Models
{
    public partial class HopdongLichsu
    {
        public int Id { get; set; }
        public string? Hopdongid { get; set; }
        public string? HoTenA { get; set; }
        public string? HoTenB { get; set; }
        public string? Gmaila { get; set; }
        public string? Gmailb { get; set; }
        public string? Noidung { get; set; }
        public DateTime? NgayThayDoi { get; set; }
        public string? ThaoTac { get; set; }
    }
}
