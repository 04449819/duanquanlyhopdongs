using API.Iserviecs;
using DBcontext.Viewmodel;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

public class MailServices : IMailServices
{
	private readonly MailSetting _mailSettings;
	public MailServices(IOptions<MailSetting> mailSettingsOptions)
	{
		_mailSettings = mailSettingsOptions.Value;
	}
	public async Task<bool> SendMail(MailData mailData)
	{
		try
		{
			using (MimeMessage emailMessage = new MimeMessage())
			{
				MailboxAddress emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
				emailMessage.From.Add(emailFrom);
				MailboxAddress emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
				emailMessage.To.Add(emailTo);
				emailMessage.Cc.Add(new MailboxAddress("Cc Receiver", "cc@example.com"));
				emailMessage.Bcc.Add(new MailboxAddress("Bcc Receiver", "bcc@example.com"));
				emailMessage.Subject = mailData.EmailSubject;
				BodyBuilder emailBodyBuilder = new BodyBuilder();

				// Tạo nội dung email với nút xác nhận "Có" và "Không"
				string confirmLinkYes = $"https://localhost:7233/api/Mail/response/confirm?response={1}&id={mailData.id}&noi_dung={mailData.noi_dung}&ngaythaydoi={DateTime.Now}";
				string confirmLinkNo = $"https://localhost:7233/api/Mail/response/confirm?response={2}&id={mailData.id}&noi_dung={mailData.noi_dung}&ngaythaydoi={DateTime.Now}";
				string emailBody = $@"
                <p>{mailData.EmailBody}</p>
                <p>
                    <a href='{confirmLinkYes}' style='background-color: green; color: white; padding: 10px 20px; text-decoration: none;'>Có</a>
                    <a href='{confirmLinkNo}' style='background-color: red; color: white; padding: 10px 20px; text-decoration: none;'>Không</a>
                </p>
            ";

				emailBodyBuilder.HtmlBody = emailBody;
				emailMessage.Body = emailBodyBuilder.ToMessageBody();

				using (SmtpClient mailClient = new SmtpClient())
				{
					await mailClient.ConnectAsync(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
					await mailClient.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password);
					await mailClient.SendAsync(emailMessage);
					await mailClient.DisconnectAsync(true);
				}
			}
			return true;
		}
		catch (Exception ex)
		{
			// Log exception if needed
			return false;
		}
	}


	public async Task<bool> SendMail1(MailData1 mailData)
	{
		try
		{
			using (MimeMessage emailMessage = new MimeMessage())
			{
				MailboxAddress emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
				emailMessage.From.Add(emailFrom);
				MailboxAddress emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
				emailMessage.To.Add(emailTo);
				emailMessage.Cc.Add(new MailboxAddress("Cc Receiver", "cc@example.com"));
				emailMessage.Bcc.Add(new MailboxAddress("Bcc Receiver", "bcc@example.com"));
				emailMessage.Subject = mailData.EmailSubject;
				BodyBuilder emailBodyBuilder = new BodyBuilder();

				// Tạo nội dung email với nút xác nhận "Có" và "Không"
				string confirmLinkYes = $"https://localhost:7233/api/Hopdong/addhopdong?response=1&noi_dung={mailData.noi_dung}&Hopdongid={mailData.hopdongid}&bena={mailData.HoTenA}&gmaila={mailData.Gmaila}&tenb={mailData.HoTenB}&gmailb={mailData.Gmailb}&ngaythaydoi={DateTime.Now}";
				string confirmLinkNo = $"https://localhost:7233/api/Hopdong/addhopdong?response=2&noi_dung={mailData.noi_dung}&Hopdongid={mailData.hopdongid}&bena={mailData.HoTenA}&gmaila={mailData.Gmaila}&tenb={mailData.HoTenB}&gmailb={mailData.Gmailb}&ngaythaydoi={DateTime.Now}";
				string emailBody = $@"
                <p>{mailData.EmailBody}</p>
                <p>
                    <a href='{confirmLinkYes}' style='background-color: green; color: white; padding: 10px 20px; text-decoration: none;'>Có</a>
                    <a href='{confirmLinkNo}' style='background-color: red; color: white; padding: 10px 20px; text-decoration: none;'>Không</a>
                </p>
            ";

				emailBodyBuilder.HtmlBody = emailBody;
				emailMessage.Body = emailBodyBuilder.ToMessageBody();

				using (SmtpClient mailClient = new SmtpClient())
				{
					await mailClient.ConnectAsync(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
					await mailClient.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password);
					await mailClient.SendAsync(emailMessage);
					await mailClient.DisconnectAsync(true);
				}
			}
			return true;
		}
		catch (Exception ex)
		{
			// Log exception if needed
			return false;
		}
	}

}
