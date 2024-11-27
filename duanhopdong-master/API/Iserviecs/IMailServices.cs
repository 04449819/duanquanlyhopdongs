using DBcontext.Viewmodel;

namespace API.Iserviecs
{
    public interface IMailServices
    {
        Task<bool> SendMail(MailData mailData);
    }
}

