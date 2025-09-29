using Microsoft.EntityFrameworkCore;

using QuinceBackend.Models;

namespace QuinceBackend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Rsvp> Rsvps => Set<Rsvp>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Rsvp>(e =>
        {
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(25).IsRequired();
            e.Property(x => x.Status).HasMaxLength(10).IsRequired();
            e.Property(x => x.CreatedAtUtc).HasDefaultValueSql("CURRENT_TIMESTAMP");
            e.HasIndex(x => x.CreatedAtUtc);
        });
    }
}
