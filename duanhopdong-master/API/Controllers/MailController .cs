using API.Iserviecs;
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

        // Inject logger vào constructor
        public MailController(IMailServices mailServices, ILogger<MailController> logger)
        {
            _mailServices = mailServices;
            _logger = logger; // Gán logger vào biến
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] MailData mailData)
        {
            // Kiểm tra và ghi lại dữ liệu nhận được
            _logger.LogInformation($"Received email data: {JsonConvert.SerializeObject(mailData)}");

            if (mailData == null)
            {
                return BadRequest("Invalid email data.");
            }

            var result = await _mailServices.SendMail(mailData);

            if (result)
            {
                return Ok("1");
            }
            else
            {
                return StatusCode(500, "Failed to send email.");
            }
        }
    }
}
