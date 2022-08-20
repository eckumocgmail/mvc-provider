using Newtonsoft.Json;
using ServiceAuthorization;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;
public class Profile
{
    public dynamic IsAutorized { get; internal set; }
    public dynamic Ident { get; internal set; }
    public dynamic FirstName { get; internal set; }
    public dynamic LastName { get; internal set; }
    public string Details { get; internal set; }
}
public class OAuthClient
{
    private Profile Profile { get; set; } = new Profile();
    public static void Test()
    {
        string clientId = "51406032";
        string clientSecret = "";
        string token = "";
        try
        {
            token = OAuthClient.VK_GetServerToken(clientId, clientSecret);
        }catch(Exception ex)
        {
            Console.WriteLine("Ошибка при получении токена: "+ex.Message);

        }
        try
        {
            var data = OAuthClient.VK_GetUserData(token, new Profile());
            Console.WriteLine(data);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Ошибка при получении данных пользователя: " + ex.Message);

        }
    }
    public static string VK_CLIENT_SECRET { get; private set; }
    public static string VK_TOKEN { get; private set; }

    /// <summary>
    /// Получение разового токена с сервера для работы.
    /// </summary>
    /// <param name="client_id"></param>
    /// <param name="client_secret"></param>
    public static string VK_GetServerToken(string client_id, string client_secret)
    {
        string str = GetRequest("oauth.vk.com", "https://oauth.vk.com/access_token?client_id=" + client_id + "&client_secret=" + client_secret + "&v=5.85&grant_type=client_credentials");
        dynamic stuff = JsonConvert.DeserializeObject(str);
        string token = stuff.access_token;
        return VK_TOKEN = token;
    }

    /// <summary>
    /// Отправляем запрос на получение 
    /// </summary>
    /// <param name="req"></param>
    /// <returns></returns>
    private static string GetRequest(string host, string req)
    {
        string str = "";

        var Vk = new HttpClient();
        Vk.DefaultRequestHeaders.Add("Connection", "close");

        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(req);
        request.UseDefaultCredentials = true;
        request.PreAuthenticate = true;
        request.Credentials = CredentialCache.DefaultCredentials;
        request.Method = "GET";
        request.Host = host;
        request.UserAgent = "RM";
        request.ContentType = "application/x-www-form-urlencoded";
        request.KeepAlive = false;

        using (HttpWebResponse responsevk = (HttpWebResponse)request.GetResponse())
        using (var stream = responsevk.GetResponseStream())
        using (var streamReader = new StreamReader(stream, Encoding.UTF8))
        {
            str = streamReader.ReadToEnd();
        }
        return str;
    }

    /// <summary>
    /// Проверка авторизации пользователя через VK
    /// </summary>
    /// <param name="token"></param>
    public static Profile VK_GetUserAutorization(string token)
    {
        Profile profile = new Profile();

        string str = GetRequest("api.vk.com", 
            "https://api.vk.com/method/secure.checkToken?token=" +
            token + "&v=5.85&client_secret=" + 
            
            VK_CLIENT_SECRET + "&access_token=" + VK_TOKEN);
        dynamic stuff = JsonConvert.DeserializeObject(str);
        try
        {
            long d = stuff.response.date;
            var dt = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(d).ToLocalTime();
            d = stuff.response.expire;
            var expire = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(d).ToLocalTime();
        }
        catch (Exception ex)
        {
            OnError(ex, ex.Message);
        }

        try
        {
            profile.IsAutorized = stuff.response.success;
            profile.Ident = stuff.response.user_id;

            profile = VK_GetUserData(token, profile);
        }
        catch (Exception ex)
        {
            OnError(ex, ex.Message);
        }

        return profile;
    }


    /// <summary>
    /// Получение данных о пользователе из соц-сети VK
    /// </summary>
    /// <param name="token"></param>
    public static Profile VK_GetUserData(string token, Profile profile)
    {
        try
        {
            string str = GetRequest("api.vk.com", "https://api.vk.com/method/users.get?access_token=" + token + "&fields=photo_id,verified,sex,bdate,city,country,home_town,has_photo,photo_50,photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,online,domain,has_mobile,contacts,site,education,universities,schools,status,last_seen,followers_count,common_count,occupation,nickname,relatives,relation,personal,connections,exports,activities,interests,music,movies,tv,books,games,about,quotes,can_post,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,blacklisted,blacklisted_by_me&v=5.85");


            dynamic stuff = JsonConvert.DeserializeObject(str);

            profile.FirstName = stuff.response[0].first_name;
            profile.LastName = stuff.response[0].last_name;
            profile.Ident = stuff.response[0].id;
            //string photo_max = stuff.response[0].photo_max;
            //string bdate = stuff.response[0].bdate;
            profile.Details = str;
        }
        catch (Exception ex)
        {
            OnError(ex, ex.Message);
            profile.IsAutorized = false;
        }

        return profile;
    }

    private static void OnError(Exception ex, string message)
    {
        Console.WriteLine(message);
        Console.WriteLine(ex);
    }
}
