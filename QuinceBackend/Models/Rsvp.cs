using System;
using System.ComponentModel.DataAnnotations;

namespace QuinceBackend.Models;

public class Rsvp
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    // Keep raw string for now; can normalize later.
    [Required, MaxLength(25)]
    [RegularExpression(@"^[0-9\-\+\(\)\s\.]{7,25}$", ErrorMessage = "Phone format looks invalid.")]
    public string Phone { get; set; } = string.Empty;

    // "yes" | "maybe" for v1; enforce via validation attribute below.
    [Required]
    [RegularExpression("^(yes|maybe)$", ErrorMessage = "Status must be 'yes' or 'maybe'.")]
    public string Status { get; set; } = "yes";

    [Range(0, 20)]
    public int Guests { get; set; } = 0;

    [Range(0, 20)]
    public int Kids { get; set; } = 0;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
