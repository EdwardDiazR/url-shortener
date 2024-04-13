namespace UrlShortenerApi.Models.DTO.User
{
    public class RegisterUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmedPassword { get; set; }
        public string username { get; set; }
        public char Gender { get; set; }
    }
}
