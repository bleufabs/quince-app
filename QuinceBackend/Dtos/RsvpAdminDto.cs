
using System;

namespace QuinceBackend.Dtos;

public record RsvpAdminDto(
    int Id,
    string Name,
    string Phone,    // only on admin responses
    string Status,   // "yes" | "maybe"
    int Guests,
    int Kids,
    DateTime CreatedAtUtc
);
// This DTO is used to expose RSVP data to admin endpoints, including sensitive information like phone numbers.