using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BaayuLok.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPatientAndDepartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Departments_DepartmentId",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Users_CreatedByOfficerId",
                table: "Patients");

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"));

            migrationBuilder.AlterColumn<decimal>(
                name: "CostTotal",
                table: "Patients",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "CostRaised",
                table: "Patients",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Departments_DepartmentId",
                table: "Patients",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Users_CreatedByOfficerId",
                table: "Patients",
                column: "CreatedByOfficerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Departments_DepartmentId",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Users_CreatedByOfficerId",
                table: "Patients");

            migrationBuilder.AlterColumn<decimal>(
                name: "CostTotal",
                table: "Patients",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "CostRaised",
                table: "Patients",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "Icon", "Name" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "Heart", "Cardiology" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "Brain", "Neurology" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "Ribbon", "Oncology" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Departments_DepartmentId",
                table: "Patients",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Users_CreatedByOfficerId",
                table: "Patients",
                column: "CreatedByOfficerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
