using Microsoft.AspNetCore.Mvc;
namespace QuinceBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RSVPController : ControllerBase
    {
        // Define your actions here
        [HttpPost]
        public IActionResult SubmitRSVP([FromForm] RSVPForm form)
        {
            return Ok($"RSVP recieved for {form.Name} with Phone {form.Phone}");
        }
    }

    // Define the RSVPForm model
    public class RSVPForm
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }
    }
}