// Dtos/MappingExtensions.cs
using QuinceBackend.Dtos;
using QuinceBackend.Models;

namespace QuinceBackend.Dtos;

public static class MappingExtensions
{
    public static RsvpPublicDto ToPublicDto(this Rsvp r) =>
        new(
            r.Id,
            r.Name,
            r.Status,
            r.Guests,
            r.Kids,
            r.CreatedAtUtc
        );

    public static RsvpAdminDto ToAdminDto(this Rsvp r) =>
        new(
            r.Id,
            r.Name,
            r.Phone,
            r.Status,
            r.Guests,
            r.Kids,
            r.CreatedAtUtc
        );
}
// This file contains extension methods to map between Rsvp model and its DTO representations.