using System.ComponentModel.DataAnnotations;

namespace QuinceBackend.Dtos;

public class CreateRsvpDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(25)]
    [RegularExpression(@"^[0-9\-\+\(\)\s\.]{7,25}$")]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [RegularExpression("^(yes|maybe)$")]
    public string Status { get; set; } = "yes";

    [Range(0, 20)]
    public int Guests { get; set; } = 0;

    [Range(0, 20)]
    public int Kids { get; set; } = 0;
}
