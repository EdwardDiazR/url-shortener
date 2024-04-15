using Microsoft.EntityFrameworkCore.Migrations;


#nullable disable

namespace UrlShortenerApi.Migrations
{
    /// <inheritdoc />
    public partial class s : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "profile_description",
                table: "users",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UrlHash",
                table: "urls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "profile_description",
                table: "users");

            migrationBuilder.DropColumn(
                name: "UrlHash",
                table: "urls");
        }
    }
}
