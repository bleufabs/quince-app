using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using QuinceBackend.Data;
using QuinceBackend.Dtos;
using QuinceBackend.Models;

namespace QuinceBackend.Controllers;

[ApiController]
[Route("rsvps")]
public class RsvpsController(AppDbContext db) : ControllerBase
{
    // GET /rsvps
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Rsvp>>> GetAll()
    {
        var list = await db.Rsvps
            .OrderByDescending(r => r.CreatedAtUtc)
            .ToListAsync();
        return Ok(list);
    }

    // POST /rsvps
    [HttpPost]
    public async Task<ActionResult<Rsvp>> Create([FromBody] CreateRsvpDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var entity = new Rsvp
        {
            Name = dto.Name.Trim(),
            Phone = dto.Phone.Trim(),
            Status = dto.Status.Trim().ToLowerInvariant(),
            Guests = dto.Guests,
            Kids = dto.Kids,
            CreatedAtUtc = DateTime.UtcNow
        };

        db.Rsvps.Add(entity);
        await db.SaveChangesAsync();

        // Return 201 + Location header
        return CreatedAtAction(nameof(GetOne), new { id = entity.Id }, entity);
    }

    // GET /rsvps/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Rsvp>> GetOne([FromRoute] int id)
    {
        var r = await db.Rsvps.FindAsync(id);
        if (r is null) return NotFound();
        return Ok(r);
    }
}
