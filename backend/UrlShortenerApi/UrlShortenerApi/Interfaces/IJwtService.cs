namespace UrlShortenerApi.Interfaces
{
    public interface IJwtService
    {
        public string GenerateJWT(int UserId, string username);
    }
}
