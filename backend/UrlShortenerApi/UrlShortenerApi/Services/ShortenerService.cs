using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using UrlShortenerApi.Data;
using UrlShortenerApi.Interfaces;
using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO;

namespace UrlShortenerApi.Services
{
    public class ShortenerService : IShortenerService
    {
        private readonly string shortBaseUrl = "mislinks.do";
        private readonly string longBaseUrl = "https://mislinks.do";

        private readonly string countryZone = "Atlantic Standard Time";
        private TimeZoneInfo timeZone;
        private DateTime now;


        private int ShortUrlLength = 7;

        private ApplicationDbContext _db;
        public ShortenerService(ApplicationDbContext db)
        {
            _db = db;
            timeZone = TimeZoneInfo.FindSystemTimeZoneById(countryZone);
            now = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZone);
        }

        public List<Url> GetUrlsByUsername(string Username)
        {

            //TODO: CHANGE TO USER NAME LATER WHEN CREATE USER DB DATA
            //User? user = _db.User.FirstOrDefault(x => x.UserId == 1);
            List<Url> urls = _db.Url.Where(url=>url.UserId == 1).ToList(); 

            //TODO: If user doesn't exists throw an exception

            return urls;
        }

        public Url GetUrlDetailsById(int UrlId,int UserId)
        {
            Url ? url = _db.Url.FirstOrDefault(url=> url.Id == UrlId && url.UserId == UserId);
            if(url == null)
            {
                throw new Exception("No se encuentra coincidencias con esa Url");
            }

            return url;
        }

        public string GetFullUrl(string shortUrl)
        {
            Url ? url = _db.Url.Where(u => u.ShortUrl == shortUrl).FirstOrDefault();

            if (url == null)
            {
                throw new Exception("No se pudo encontrar ninguna url");
            }

            _db.Database.BeginTransaction();

            url.VisitedTimes += 1;
            url.LastTimeVisited = now;

            _db.Url.Update(url);
            _db.SaveChanges();
            _db.Database.CommitTransaction();

            return url.LongUrl;
        }

        public Url CreateShortUrl(CreateUrlDto UrlDto)
        {

            Console.WriteLine(timeZone);
            string FinalShortUrl;
            string FullShortUrl;

            try
            {
                using (SHA256 sha256 = SHA256.Create())
                {
                    string RandomGuid = Guid.NewGuid().ToString();

                    byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(RandomGuid + UrlDto.Url));

                    StringBuilder HashString = new StringBuilder();

                    for (int i = 0; i < data.Length && HashString.Length < ShortUrlLength; i++)
                    {
                        var byteSplit = data[i].ToString("x2");
                        HashString.Append(byteSplit);
                    }

                    FinalShortUrl = $"{shortBaseUrl}/{HashString}";
                    FullShortUrl = $"{longBaseUrl}/{HashString}";

                    Console.WriteLine(FinalShortUrl);

                    if (UrlDto.UserId.HasValue)
                    {
                        //TODO: Check if user exists
                    }

                    Url url = new Url()
                    {
                        CreatedDate = DateTime.Now,
                        LongUrl = UrlDto.Url,
                        CompleteShortUrl = FullShortUrl,
                        ShortUrl = FinalShortUrl,
                        VisitedTimes = 0,
                        UserId = UrlDto.UserId,
                        UrlTitle = UrlDto.Title,
                        LastTimeVisited = null,
                    };

                    _db.Add(url);
                    _db.SaveChanges();

                    return url;
                }
            }
            catch (Exception) { throw new Exception("Error"); }
        }

        public void DeleteUrlById(int UrlId,int UserId) {

            Url? url = _db.Url.FirstOrDefault(url => url.Id == UrlId && url.UserId == UserId);

            if (url is null)
            {
                throw new Exception("No se encontro Url con ese ID");
            }

            _db.Url.Remove(url);
            _db.SaveChanges();
        }
    }
}
