using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatSampleApi.Persistence.Migrations
{
    public partial class IsOnline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOnline",
                table: "AuthUser",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOnline",
                table: "AuthUser");
        }
    }
}
