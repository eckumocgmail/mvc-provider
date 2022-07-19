
using MailKit.Net.Pop3;
using MailKit.Security;
using MimeKit;

using System;
using System.Collections.Generic;

/// <summary>
/// Сервис умеет отправлять электронную почту и считывать входящие письма
/// </summary>
public class EmailService: IEmailService
{
    private string emailName;
    private string emailAddress;
    private string emailPassword;
    private string smtpHost;
    private int smtpPort;        
    private string popHost;
    private int popPort;
       

    public EmailService()
    {
        this.emailName = "Администрация сайта";
        this.emailAddress = "kba-2018@mail.ru";
        this.emailPassword = "txzioEn95qfbS5dVl9Tk";
        this.smtpHost = "smtp.mail.ru";
        this.smtpPort = 587;           
        this.popHost = "pop.mail.ru";
        this.popPort = 995;
    }


    /// <summary>
    /// Отправка сообщения по электронной почте
    /// </summary> 
    
    public void SendEmail(string email, string subject, string message)
    {
        using (var smtp = new MailKit.Net.Smtp.SmtpClient())
        {
            smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;
            
            smtp.Connect(smtpHost, smtpPort, SecureSocketOptions.Auto);
            smtp.Authenticate(emailAddress, emailPassword);
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(this.emailName, emailAddress));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };
                
            smtp.Send(emailMessage);
            smtp.Disconnect(true);
        }
    }

    /*
    /// <summary>
    /// Отправка сообщения по электронной почте с прикреплёнными файлами
    /// </summary> 
    public void SendEmail(string email, string subject, string message, 
                            TypeFile[] resources)
    {
        using (var smtp = new MailKit.Net.Smtp.SmtpClient())
        {
            smtp.ServerCertificateValidationCallback = (s, c, h, e) =>
            {
                return true;
            };

            smtp.Connect(smtpHost, smtpPort, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailAddress, emailPassword);
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(this.emailName, emailAddress));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            var builder = new BodyBuilder();
                
            builder.TextBody = message;
            if (resources != null)
            {
               /* foreach(TypeFile resource in resources)
                {
                    System.IO.File.WriteAllBytes(resource.Name, resource.Data);
                    builder.Attachments.Add(resource.Name);
                }* /
            }                             
            emailMessage.Body = builder.ToMessageBody();
               
            smtp.Send(emailMessage);
            smtp.Disconnect(true);
        }
    }*/


    /// <summary>
    /// Получение входящих сообщений
    /// </summary>
    public IEnumerable<MessageModel> Recieve()
    {
        var res = new List<MessageModel>();
        using (var client = new Pop3Client())
        {                
            client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            client.Connect(popHost, popPort);
            client.AuthenticationMechanisms.Remove("XOAUTH2");
            client.Authenticate(emailAddress, this.emailPassword );
            for (int i = 0; i < client.Count; i++)
            {
                MimeMessage message = client.GetMessage(i);
                
                res.Add(new MessageModel()
                {
                    Sender = message.From.ToString(),
                    Text = message.TextBody.ToString(),
                    Date = message.Date
                });
                Console.WriteLine(message.Subject);
            }
            client.Disconnect(true);
        }
        return res;
    }



    /// <summary>
    /// Модель сообщения электронной почты
    /// </summary>
    public class MessageModel
    {
        public string Sender { get; internal set; }
        public string Text { get; internal set; }
        public DateTimeOffset Date { get; internal set; }
    }
}


public class EmailServiceTest
{

}