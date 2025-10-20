namespace QuinceBackend.Dtos;

public record RsvpSummaryDto(
    int Yes,
    int Maybe,
    int Total // submitter + guests + kids
);
// This DTO is used to summarize RSVP counts for public endpoints, aggregating responses into "yes", "maybe", and total counts.