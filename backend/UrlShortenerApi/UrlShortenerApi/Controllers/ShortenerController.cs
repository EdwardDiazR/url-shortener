using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using UrlShortenerApi.Interfaces;
using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO;
using UrlShortenerApi.Models.DTO.Url;
using UrlShortenerApi.Services;

namespace UrlShortenerApi.Controllers
{
    [Route("api/shortener")]
    [ApiController]
    public class ShortenerController : ControllerBase
    {
        private IShortenerService _service;
        private IJwtService _jwtService;
        public ShortenerController(IShortenerService shortenerService, IJwtService jwtService)
        {
            _jwtService = jwtService;
            _service = shortenerService;
        }

        [HttpGet("urls")]
        public ActionResult<List<Url>> GetUrlsByUsername(string username)
        {
            try
            {
                return Ok(_service.GetUrlsByUsername(username));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("get-full-url")]
        public ActionResult<UrlApiResponseDto> GetFullUrl(string Url)
        {
            try
            {
                UrlApiResponseDto LongUrl = _service.GetFullUrl(Url);
                return Ok(LongUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("details")]
        public ActionResult GetUrlDetailsById(int Url, int UserId)
        {
            try
            {
                Url UrlDetails = _service.GetUrlDetailsById(Url, UserId);
                return Ok(UrlDetails);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPost("create-short-url")]
        public ActionResult<Url> CreateShortUrl(CreateUrlDto UrlDto)
        {
            try
            {
                Url url = _service.CreateShortUrl(UrlDto);

                return Ok(url);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-jwt")]
        public ActionResult GetToken(int userId,string username)
        {
            try
            {
                return Ok(_jwtService.GenerateJWT(userId,username));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete")]
     
        public ActionResult DeleteShortUrl(int UrlId, int UserId)
        {
            try
            {
                _service.DeleteUrlById(UrlId, UserId);
                return Ok("Url eliminada con exito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
