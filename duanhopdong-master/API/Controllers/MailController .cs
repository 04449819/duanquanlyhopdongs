using API.Iserviecs;
using DBcontext.Models;
using DBcontext.Viewmodel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Thêm namespace này
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailServices _mailServices;
        private readonly ILogger<MailController> _logger; // Khai báo logger
		private readonly ApplicationDbContext db;

		// Inject logger vào constructor
		public MailController(IMailServices mailServices, ILogger<MailController> logger)
        {
            _mailServices = mailServices;
            _logger = logger; // Gán logger vào biến
			db = new ApplicationDbContext();
		}

		[HttpGet("response/confirm")]
		public async Task<IActionResult> HandleResponse(int response, int id,string noi_dung,DateTime ngaythaydoi)
		{
			try
			{

				// Xử lý phản hồi
				if (response == 1)
				{
					try
					{
						Hopdong hd = await db.Hopdongs.FindAsync(id);
						hd.Noidung = noi_dung;
						hd.NgayThayDoi = ngaythaydoi;
						db.Update(hd);
						await db.SaveChangesAsync();
						// Gọi dịch vụ hoặc thêm học sinh vào cơ sở dữ liệu
						//_studentService.AddStudent(studentId);
						return Ok("Hợp đồng đã được chỉnh sửa thành công!");
					}
					catch (Exception)
					{

						return BadRequest("Hợp đồng đã được chỉnh sửa thất bại!");
					}

				}
				else
				{
					// Không làm gì nếu phản hồi là "no"
					return Ok("Hợp đồng không được sửa.");
				}
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error handling response: {ex.Message}");
				return StatusCode(500, "An error occurred while processing the response.");
			}
		}


		[HttpPost("send-student-confirmation")]
		public async Task<IActionResult> SendStudentConfirmationEmailAsync(int id,string hopdongid,string noidung, string email, DateTime ngaythaydoi)
		{
			try
			{
				_logger.LogInformation($"Preparing email for student: {hopdongid}, ID: {id}");

				var mailData = new MailData
				{
					id = id,
					noi_dung = noidung,
					EmailToId = email,
					EmailToName = hopdongid,
					EmailSubject = "Xác nhận thêm học sinh",
					EmailBody = $@"
                <p>Xin chào,</p>
                <p>Bạn có muốn sửa hợp đồng sau đây vào hệ thống không?</p>
                <ul>
                    <li><b>Tên:</b> {hopdongid}</li>
                    <li><b>ID:</b> {id}</li>
                   <li><b>Thoi gian:</b> {ngaythaydoi}</li>
                </ul>
                <p>Hãy chọn một trong hai tùy chọn bên dưới:</p>
            "
				};

				var result = await _mailServices.SendMail(mailData);

				if (result)
				{
					_logger.LogInformation($"Email sent successfully for student ID: {id}");
					return Ok(1);
				}
				else
				{
					_logger.LogError($"Failed to send email for student ID: {id}");
					return StatusCode(500, "Failed to send email.");
				}
			}
			catch (Exception ex)
			{
				_logger.LogError($"An error occurred while sending email for student ID: {id}. Error: {ex.Message}");
				return StatusCode(500, "An error occurred.");
			}
		}


		[HttpPost("send-student-confirmation1")]
		public async Task<IActionResult> SendStudentConfirmationEmailAsync(int id, string hopdongid, string noidung,string bena,string gmaila,string benb, string email, DateTime ngaythaydoi)
		{
			try
			{
				_logger.LogInformation($"Preparing email for student: {hopdongid}, ID: {id}");

				var mailData = new MailData1
				{
					id = id,
					noi_dung = noidung,
					HoTenA = bena,
					HoTenB = benb,
					Gmaila = gmaila,
					Gmailb = email,
					EmailToId = email,
					EmailToName = hopdongid,
					hopdongid = hopdongid,
					EmailSubject = "Xác nhận thêm học sinh",
					EmailBody = $@"
                <p>Xin chào,</p>
                <p>Bạn có muốn sửa hợp đồng sau đây vào hệ thống không?</p>
                <ul>
                    <li><b>Tên:</b> {hopdongid}</li>
                    <li><b>ID:</b> {id}</li>
                   <li><b>Thoi gian:</b> {ngaythaydoi}</li>
                </ul>
                <p>Hãy chọn một trong hai tùy chọn bên dưới:</p>
            "
				};

				var result = await _mailServices.SendMail1(mailData);

				if (result)
				{
					_logger.LogInformation($"Email sent successfully for student ID: {id}");
					return Ok(1);
				}
				else
				{
					_logger.LogError($"Failed to send email for student ID: {id}");
					return StatusCode(500, "Failed to send email.");
				}
			}
			catch (Exception ex)
			{
				_logger.LogError($"An error occurred while sending email for student ID: {id}. Error: {ex.Message}");
				return StatusCode(500, "An error occurred.");
			}
		}


	}
}
