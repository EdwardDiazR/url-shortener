using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using UrlShortenerApi.Interfaces;
using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO;
using UrlShortenerApi.Services;

namespace UrlShortenerApi.Controllers
{
    [Route("api/shortener")]
    [ApiController]
    public class ShortenerController : ControllerBase
    {
        private IShortenerService _service;
        public ShortenerController(IShortenerService shortenerService) { _service = shortenerService; }

        [HttpGet("urls")]
        public ActionResult<List<Url>> GetUrlsByUsername(string username)
        {
            try
            {
                return Ok(_service.GetUrlsByUsername(username));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-full-url")]
        public ActionResult GetFullUrl(string Url)
        {
            try
            {
                string LongUrl = _service.GetFullUrl(Url);
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
