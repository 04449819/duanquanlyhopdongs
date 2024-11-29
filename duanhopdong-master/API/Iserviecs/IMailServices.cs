using DBcontext.Viewmodel;

namespace API.Iserviecs
{
    public interface IMailServices
    {
        Task<bool> SendMail(MailData mailData);
		Task<bool> SendMail1(MailData1 mailData);
	}
}

