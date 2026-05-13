using BaayuLok.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BaayuLok.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    // Auth tables
    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    // Patient/case tables
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<PatientDocument> PatientDocuments { get; set; }
    public DbSet<Donation> Donations { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User email must be unique
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Department name should be unique, e.g. Cardiology, Oncology, Emergency
        modelBuilder.Entity<Department>()
            .HasIndex(d => d.Name)
            .IsUnique();

        // Patient -> Department relationship
        // One department can have many patients.
        modelBuilder.Entity<Patient>()
            .HasOne(p => p.Department)
            .WithMany()
            .HasForeignKey(p => p.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Patient -> CreatedByOfficer relationship
        // One officer/user can create many patient cases.
        modelBuilder.Entity<Patient>()
            .HasOne(p => p.CreatedByOfficer)
            .WithMany()
            .HasForeignKey(p => p.CreatedByOfficerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Money columns should use proper decimal precision in PostgreSQL
        modelBuilder.Entity<Patient>()
            .Property(p => p.CostTotal)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Patient>()
            .Property(p => p.CostRaised)
            .HasPrecision(18, 2);

modelBuilder.Entity<PatientDocument>()
    .HasOne(d => d.Patient)
    .WithMany()
    .HasForeignKey(d => d.PatientId)
    .OnDelete(DeleteBehavior.Cascade);

modelBuilder.Entity<PatientDocument>()
    .HasOne(d => d.VerifiedByUser)
    .WithMany()
    .HasForeignKey(d => d.VerifiedByUserId)
    .OnDelete(DeleteBehavior.Restrict);

modelBuilder.Entity<Donation>()
    .HasOne(d => d.Patient)
    .WithMany()
    .HasForeignKey(d => d.PatientId)
    .OnDelete(DeleteBehavior.Restrict);

modelBuilder.Entity<Donation>()
    .HasOne(d => d.DonorUser)
    .WithMany()
    .HasForeignKey(d => d.DonorUserId)
    .OnDelete(DeleteBehavior.SetNull);

modelBuilder.Entity<Donation>()
    .Property(d => d.Amount)
    .HasPrecision(18, 2);



    }
}
