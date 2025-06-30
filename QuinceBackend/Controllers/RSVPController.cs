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
            return Ok($"RSVP received for {form.Name} with Phone {form.Phone}. Status: {form.Status}, Guests: {form.Guests}");
        }
    }

    // Define the RSVPForm model
    public class RSVPForm
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Status { get; set; } // new field
        public int Guests { get; set; } // new field
    }
}