var builder = WebApplication.CreateBuilder(args);

// Register services for MVC controllers
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Modern way to map controller routes

app.Run();
