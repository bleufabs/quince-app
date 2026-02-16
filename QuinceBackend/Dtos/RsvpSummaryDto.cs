namespace QuinceBackend.Dtos;

public record RsvpSummaryDto(
    int Yes,
    int Maybe,
    int RsvpCount,   // number of RSVP submissions
    int GuestCount,  // adult guests (not kids)
    int KidsCount,   // kids
    int Total        // submitter + guests + kids
);