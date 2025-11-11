using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

using QuinceBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// EF Core (SQLite by default; override with ConnectionStrings:Default)
var connStr = builder.Configuration.GetConnectionString("Default");
if (string.IsNullOrWhiteSpace(connStr))
{
    // Fallback for dev if not provided
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


builder.Services.AddEndpointsApiExplorer();   // for Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

// Simple rate limit to protect POST endpoints
builder.Services.AddRateLimiter(_ => _.AddFixedWindowLimiter("post-limit", options =>
{
    options.Window = TimeSpan.FromMinutes(1);
    options.PermitLimit = 10; // 10 requests/min per IP
    options.QueueLimit = 0;
}));

var app = builder.Build();

// Auto-apply EF migrations on start (safe for SQLite; useful in prod too)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();     // redirect http -> https (in prod hosts)
app.UseCors("FrontendOnly");
app.UseRateLimiter();

app.MapControllers().RequireRateLimiting("post-limit");

// Health + friendly root
app.MapHealthChecks("/health");
app.MapGet("/", () => Results.Text("QuinceBackend is running. See /api/rsvps/summary"));

app.Run();
