using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using QuinceBackend.Data;
using QuinceBackend.Dtos;
using QuinceBackend.Models;

namespace QuinceBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RsvpsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly string _adminKey;

    public RsvpsController(AppDbContext db, IConfiguration cfg)
    {
        _db = db;
        _adminKey = cfg["Admin:ApiKey"] ?? string.Empty;
    }

    // Keep a simple header check for admin endpoints
    private bool IsAdmin(HttpRequest req) =>
        req.Headers.TryGetValue("X-Admin-Key", out var v) && v == _adminKey;

    // Normalize phone: keep optional leading + and digits
    private static string NormalizePhone(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone)) return string.Empty;
        var plus = phone.Trim().StartsWith("+") ? "+" : "";
        var digits = new string(phone.Where(char.IsDigit).ToArray());
        return plus + digits;
    }

    // POST /api/rsvps  (PUBLIC) — create one RSVP
    [HttpPost]
    public async Task<ActionResult<RsvpPublicDto>> Create([FromBody] CreateRsvpDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        if (dto.Status != "yes" && dto.Status != "maybe")
            return BadRequest("Status must be 'yes' or 'maybe'.");

        var normPhone = NormalizePhone(dto.Phone);
        if (normPhone.Length < 10) return BadRequest("Phone looks invalid.");

        var entity = new Rsvp
        {
            Name = dto.Name.Trim(),
            Phone = normPhone,
            Status = dto.Status,
            Guests = Math.Clamp(dto.Guests, 0, 20),
            Kids = Math.Clamp(dto.Kids, 0, 20),
            CreatedAtUtc = DateTime.UtcNow
        };

        _db.Rsvps.Add(entity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOnePublic), new { id = entity.Id }, entity.ToPublicDto());
    }

    // GET /api/rsvps/{id}  (PUBLIC) — single item, phone never returned
    [HttpGet("{id:int}")]
    public async Task<ActionResult<RsvpPublicDto>> GetOnePublic(int id)
    {
        var r = await _db.Rsvps.FindAsync(id);
        if (r is null) return NotFound();
        return r.ToPublicDto();
    }

    // GET /api/rsvps/summary  (PUBLIC) — counts for a small widget
    [HttpGet("summary")]
    public async Task<ActionResult<RsvpSummaryDto>> Summary()
    {
        var yes = await _db.Rsvps.CountAsync(x => x.Status == "yes");
        var maybe = await _db.Rsvps.CountAsync(x => x.Status == "maybe");
        var total = await _db.Rsvps.SumAsync(x => x.Guests + x.Kids + 1); // +1 = submitter

        return new RsvpSummaryDto(yes, maybe, total);
    }

    // GET /api/rsvps/admin  (ADMIN) — full list including phones
    [HttpGet("admin")]
    public async Task<ActionResult<IEnumerable<RsvpAdminDto>>> AdminList()
    {
        if (!IsAdmin(Request)) return Unauthorized("Missing or invalid X-Admin-Key.");

        var rows = await _db.Rsvps
            .OrderByDescending(x => x.CreatedAtUtc)
            .Select(x => x.ToAdminDto())
            .ToListAsync();

        return rows;
    }
}