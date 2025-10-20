
using System;

namespace QuinceBackend.Dtos;

public record RsvpPublicDto(
    int Id,
    string Name,
    string Status,   // "yes" | "maybe"
    int Guests,
    int Kids,
    DateTime CreatedAtUtc
);
// This DTO is used to expose RSVP data to the public API, ensuring sensitive information like phone numbers is not included.