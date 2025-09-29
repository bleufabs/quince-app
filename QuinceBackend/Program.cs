using Microsoft.EntityFrameworkCore;

using QuinceBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers + JSON options if needed
builder.Services.AddControllers();

// EF Core (SQLite)
var connStr = builder.Configuration.GetConnectionString("Default");
if (string.IsNullOrWhiteSpace(connStr))
{
    // Fallback for dev if someone forgot to set it
    connStr = "Data Source=rsvp.db";
}
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(connStr));

// CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(o =>
{
    o.AddPolicy("FrontendOnly", p =>
    {
        if (allowedOrigins.Length == 0)
            p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        else
            p.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("FrontendOnly");

app.MapControllers();

app.Run();
