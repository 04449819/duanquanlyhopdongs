using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBcontext.Viewmodel
{
    public class MailData1
	{
		
		public string EmailToId { get; set; }
		public string EmailToName { get; set; }
		public string EmailSubject { get; set; }
		public string EmailBody { get; set; }

		public int id { get; set; }
		public string? HoTenA { get; set; }
		public string? HoTenB { get; set; }
		public string? Gmaila { get; set; }
		public string? hopdongid { get; set; }
		public string? Gmailb { get; set; }
		public DateTime? NgayThayDoi { get; set; }
		public string noi_dung { get; set; }
	}
}
