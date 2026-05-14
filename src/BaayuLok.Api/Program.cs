using BaayuLok.Application.Interfaces;
using BaayuLok.Application.UseCases.Auth.Register;
using BaayuLok.Infrastructure.Data;
using BaayuLok.Infrastructure.Repositories;
using BaayuLok.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using BaayuLok.Api.Middleware;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// 1. Database Connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()    // Allows your Vite app to connect
              .AllowAnyHeader()    // Allows JSON headers
              .AllowAnyMethod();   // Allows GET, POST, PUT, PATCH, DELETE, OPTIONS
    });
});



// 2. Register our custom Services (Dependency Injection)
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();    
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPatientDocumentRepository, PatientDocumentRepository>();
builder.Services.AddScoped<IDonationRepository, DonationRepository>();




// 3. Register MediatR (so it knows where to find our Handlers)
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterUserCommand).Assembly));

// Adding Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();
app.Run();